import {
    CollectionResponse,
    GetAllArgs,
    GetTaxonArgs,
    RestClient,
    SdkItem,
    TaxonDto,
} from '@progress/sitefinity-nextjs-sdk/rest-sdk';
import { CorianderContentListEntity } from '../../components/common/content-list-entity/coriander-content-list-entity';
import {
    LinkFieldData,
    FilterMainOperator,
    FilterOperators,
    FilterRules,
    ContentListModelItem,
    ContentListModelItems,
    States,
    CombinedFilter,
    FilterClause,
    LocationResponse,
} from '../../interfaces';
import countries from '../data/countries.json';
import states from '../data/states.json';
import { DetailPageSelectionMode } from '@progress/sitefinity-nextjs-sdk/widgets';
import { RequestContext } from '@progress/sitefinity-nextjs-sdk';

export const getLinkAttributes = (link: LinkFieldData) => {
    if (!link) {
        return {};
    }
    const { href, tooltip, text, target } = link;

    return {
        ...(() => (href ? { href } : {}))(),
        ...(() => (text ? { title: text } : {}))(),
        ...(() => (tooltip ? { title: tooltip } : {}))(),
        ...(() => (target ? { target } : {}))(),
    };
};

export const getContentListClasses = (entity: CorianderContentListEntity): string =>
    getFieldClasses(entity, 'Content list');

export const getFieldClasses = (entity: CorianderContentListEntity, fieldName: string): string => {
    if (!entity.CssClasses) {
        return '';
    }

    const config = entity.CssClasses.find(
        ({ FieldName }: { FieldName: string; CssClass: string }) => FieldName === fieldName,
    );
    if (!config) {
        return '';
    }

    return config.CssClass;
};

export const getDetailedItem = async <T extends SdkItem>(
    type: string,
    fieldValue: string[],
    filterIds?: string[],
): Promise<T[]> => {
    let result: T[] = [];
    try {
        const data = await getItems<T>(type, {
            mainOperator: FilterMainOperator.Or,
            childOperator: FilterOperators.Equal,
            fieldValues: { Id: fieldValue },
        });

        result = data.Items;
    } catch (error) {
        console.error(error);
    }

    return result;
};

export const getItems = async <T extends SdkItem>(
    type: string,
    filterRules: FilterRules,
    fields = ['*'],
): Promise<CollectionResponse<T>> => {
    const filter = createFilterContext(filterRules);

    const args: GetAllArgs = {
        type,
        filter,
        fields,
    };
    return await RestClient.getItems<T>(args);
};

export const getItemDefaultUrl = (item: ContentListModelItem): string => {
    return item.Original.ItemDefaultUrl || '';
};

export const getCountryNameByCode = (countryCode: string): string => {
    return (countries as { [key: string]: string })[countryCode] || '';
};

export const getReadMoreUrl = async (items: ContentListModelItems, type?: string): Promise<string> => {
    let defaultUrl = '';
    if (!items.length || !type) {
        return defaultUrl;
    }

    const { ItemDefaultUrl, Id } = items[0].Original;

    return await getDefaultLocationUrl(type, ItemDefaultUrl, Id);
};

export const getStateName = (countryCode: string, stateCode: string): string => {
    let defaultName = '';
    const statesInCountry = (states as States)[countryCode.toUpperCase()];
    if (!statesInCountry) {
        return defaultName;
    }

    return (states as States)[countryCode.toUpperCase()][stateCode.toUpperCase()] || defaultName;
};

export const getRelatedTaxonItems = async (
    items: ContentListModelItems,
    taxaLabel: string,
    taxonomyId: string,
): Promise<TaxonDto[]> => {
    const taxaIds: string[] = items.flatMap((item) => item.Original[taxaLabel]);
    return await getTaxonItemsByIds(taxaIds, taxonomyId);
};

export const getTaxonItemsByIds = async (taxaIds: string[], taxonomyId: string): Promise<TaxonDto[]> => {
    const uniqueTaxaIds = [...new Set(taxaIds)];
    const taxonArgs: GetTaxonArgs = {
        taxonomyId,
        showEmpty: true,
        orderBy: 'Title ASC',
        taxaIds: uniqueTaxaIds,
        selectionMode: 'All',
        contentType: '',
    };

    let result: TaxonDto[] = [];

    try {
        const taxaData = await RestClient.getTaxons(taxonArgs);
        result = taxaData.filter((td) => uniqueTaxaIds.includes(td.Id));
    } catch (error) {
        console.error(error);
    }

    return result;
};

export const getDefaultLocationUrl = async (type: string, itemDefaultUrl: string, itemId: string): Promise<string> => {
    let defaultUrl = '';

    try {
        const wholeUrl = `${RestClient.buildItemBaseUrl(type)}(${itemId})/Default.DisplayPages()`;
        const locationData = await RestClient.sendRequest<LocationResponse>({ url: wholeUrl });
        const liveUrl = locationData.value[0].LiveUrl;
        const parentDefaultUrl = itemDefaultUrl;
        defaultUrl = liveUrl.replace(parentDefaultUrl, '');
    } catch (error) {
        console.error(error);
        return defaultUrl;
    }

    return defaultUrl;
};

export const getPropertyValue = <T>(object: any, property: string): T | null => {
    if (Object.keys(object).includes(property)) {
        return object[property].Value;
    }

    return null;
};

export const getDetailsHref = ({
    item,
    detailPageMode,
    detailPageUrl,
    requestContext,
}: {
    item: { Original: SdkItem; Title?: { Value?: string } };
    detailPageMode: DetailPageSelectionMode;
    detailPageUrl?: string;
    requestContext?: RequestContext;
}): { href: string } => {
    let href = '';

    if (item.Original?.ItemDefaultUrl && detailPageUrl) {
        href = detailPageUrl + item.Original?.ItemDefaultUrl;

        if (detailPageMode === DetailPageSelectionMode.SamePage) {
            if (requestContext && requestContext.searchParams && Object.keys(requestContext.searchParams).length) {
                href += '?' + new URLSearchParams(requestContext.searchParams).toString();
            }
        }
    }

    return { href };
};

const createFilterContext = ({
    mainOperator,
    childOperator,
    fieldValues,
}: FilterRules): CombinedFilter | FilterClause => {
    const fieldCount = Object.keys(fieldValues).length;
    let firstFieldValueCount: null | number = null;
    if (fieldCount === 1) {
        firstFieldValueCount = fieldValues[Object.keys(fieldValues)[0]].length;
    }

    if (fieldCount === 1 && firstFieldValueCount === 1) {
        const fieldName = Object.keys(fieldValues)[0];
        return {
            FieldName: fieldName,
            FieldValue: fieldValues[fieldName][0],
            Operator: childOperator,
        };
    }

    const filter: CombinedFilter = {
        Operator: mainOperator!,
        ChildFilters: [],
    };

    for (const [fName, fValues] of Object.entries(fieldValues)) {
        const uniqueValues = [...new Set(fValues)];
        filter.ChildFilters.push(
            ...uniqueValues.map((fValue) => ({
                FieldName: fName,
                FieldValue: fValue,
                Operator: childOperator,
            })),
        );
    }

    return filter;
};
