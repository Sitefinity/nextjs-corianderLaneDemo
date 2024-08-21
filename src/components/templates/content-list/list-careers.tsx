import { combineClassNames } from '@progress/sitefinity-nextjs-sdk';
import { ContentListMasterViewProps, formatDate } from '@progress/sitefinity-nextjs-sdk/widgets';
import {
    TAXON_ID,
    getDefaultLocationUrl,
    getDetailsHref,
    getItemDefaultUrl,
    getItems,
    getPropertyValue,
    getRelatedTaxonItems,
    sanitizeTemplateValue,
} from '@utils';
import { ContentListModelItems, ParentItem, FilterMainOperator, FilterOperators } from '@interfaces';
import Link from 'next/link';
import { CorianderContentListEntity } from '../../common/content-list-entity/coriander-content-list-entity';

const locationType = 'Telerik.Sitefinity.DynamicTypes.Model.Locations.Location';

export const ListCareers = async ({
    attributes,
    detailPageUrl,
    items,
    widgetContext,
    showLocation = false,
}: ListCareersProps) => {
    const { model, requestContext } = widgetContext;
    const entity = model.Properties;
    const { className = '', ...wrapperAttributes } = attributes;
    const jobDivisions = await getRelatedTaxonItems(items, TAXON_ID.JOB_DIVISIONS.label, TAXON_ID.JOB_DIVISIONS.id);
    const parents = await getParents(items);
    const defaultLocationUrl = await getCareersDefaultLocationUrl(parents);

    return (
        <div {...wrapperAttributes}>
            <h2 className='my-4'>{entity.OpenCareerHeading}</h2>
            {items.map((item, index) => {
                const title = getPropertyValue<string>(item, 'Title');
                const publicationDate = getPropertyValue<string>(item, 'PublicationDate');
                const summary = getPropertyValue<string>(item, 'Summary');
                const itemJobDivisions: string[] = item.Original.jobdivisions;
                const itemUrl: string = getItemDefaultUrl(item);
                const keyJobDivisions = jobDivisions.filter((jd) => itemJobDivisions.includes(jd.Id));
                const titleClassAttr = item.Title.Css || '';
                const publicationDateClassAttr = item.PublicationDate.Css || '';
                const summaryClassAttr = item.Summary.Css || '';
                const parent = getParentItem(parents, item.Original.ParentId);
                const { href } = getDetailsHref({
                    item,
                    detailPageUrl: detailPageUrl,
                    detailPageMode: entity.DetailPageMode,
                    requestContext: requestContext,
                });

                return (
                    <>
                        <div className='d-flex justify-content-between align-items-center gap-3' key={index}>
                            <div>
                                {title && (
                                    <h3 className={combineClassNames('mb-2', titleClassAttr)}>
                                        <Link className='cl-txt-dark text-decoration-none' href={href}>
                                            {sanitizeTemplateValue(title)}
                                        </Link>
                                    </h3>
                                )}
                                {showLocation && parent && defaultLocationUrl.length > 0 && (
                                    <h5>
                                        Location:{' '}
                                        <Link href={`${defaultLocationUrl}${parent.ItemDefaultUrl}`}>
                                            {sanitizeTemplateValue(parent.Title)}
                                        </Link>
                                    </h5>
                                )}
                                <div className={combineClassNames('mb-3', publicationDateClassAttr)}>
                                    <strong>{entity.PostedLabel}</strong>
                                    {formatDate(publicationDate as string, requestContext.culture)}
                                </div>
                                {summary && (
                                    <p className={combineClassNames('mb-4', summaryClassAttr)}>
                                        {sanitizeTemplateValue(summary)}
                                    </p>
                                )}
                                {/* TODO Related links */}
                                {itemUrl.length > 0 && (
                                    <Link href={href} className='btn btn-primary'>
                                        {entity.ReadMoreLabel}
                                    </Link>
                                )}
                            </div>
                            <div>
                                {keyJobDivisions.length > 0 && (
                                    <>
                                        <p className='text-muted text-uppercase small mb-1'>{entity.DivisionsLabel}</p>
                                        <ul className='list-unstyled'>
                                            {keyJobDivisions.map((keyJobDivision) => (
                                                <li className='1' key={keyJobDivision.Id}>
                                                    {sanitizeTemplateValue(keyJobDivision.Title)}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                        {index !== items.length - 1 && <hr />}
                    </>
                );
            })}
        </div>
    );
};

const getParents = async (items: ContentListModelItems): Promise<ParentItem[]> => {
    const type = locationType;
    const fields = ['Title', 'Id', 'ItemDefaultUrl'];
    const parentIds = getParentIds(items);

    let parents: ParentItem[] = [];

    try {
        const data = await getItems<ParentItem>(
            type,
            {
                mainOperator: FilterMainOperator.Or,
                childOperator: FilterOperators.Equal,
                fieldValues: { Id: parentIds },
            },
            fields,
        );

        parents = data.Items;
    } catch (error) {
        console.error(error);
    }

    return parents;
};

const getParentIds = (items: ContentListModelItems): string[] => {
    return items.map((item) => item.Original.ParentId);
};

const getCareersDefaultLocationUrl = async (parents: ParentItem[]): Promise<string> => {
    let defaultUrl = '';
    if (!parents.length) {
        return defaultUrl;
    }

    const { ItemDefaultUrl, Id } = parents[0];

    return await getDefaultLocationUrl(locationType, ItemDefaultUrl, Id);
};

const getParentItem = (parents: ParentItem[], parentId: string): ParentItem | null => {
    let result = null;
    if (!parents || !parents.length || !parentId) {
        return result;
    }

    const parent = parents.find((p) => p.Id === parentId);
    if (!parent) {
        return result;
    }

    return parent;
};

interface ListCareersProps extends ContentListMasterViewProps<CorianderContentListEntity> {
    showLocation: boolean;
}
