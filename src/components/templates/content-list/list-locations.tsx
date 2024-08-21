import {
    MAP_ICON_SETTINGS,
    getContentListClasses,
    getCountryNameByCode,
    getDetailsHref,
    getFieldClasses,
    getItems,
    getPropertyValue,
    getStateName,
    getUniqueId,
    sanitizeTemplateValue,
} from '@utils';
import {
    ContentListModelItems,
    CorianderLocation,
    LocationAddress,
    Image,
    FilterMainOperator,
    FilterOperators,
} from '@interfaces';
import { CorianderContentListEntity, MapWrapper } from '@components';
import { combineClassNames } from '@progress/sitefinity-nextjs-sdk';
import Link from 'next/link';
import { Amenities } from '../../common/amenities/amenities';
import { ContentListMasterViewProps } from '@progress/sitefinity-nextjs-sdk/widgets';
export const ListLocations = async ({
    attributes,
    detailPageUrl,
    items,
    widgetContext,
}: ContentListMasterViewProps<CorianderContentListEntity>) => {
    const { model, requestContext } = widgetContext;
    const entity = model.Properties;
    const wrapperCss = getContentListClasses(entity);
    const titleCss = getFieldClasses(entity, 'Title');
    const hoursCss = getFieldClasses(entity, 'Hours');
    const additionalHoursCss = getFieldClasses(entity, 'AdditionalHours');
    const imagesCss = getFieldClasses(entity, 'Images');
    const addressCss = getFieldClasses(entity, 'LocationAddress');
    const contentListId = getUniqueId('cl-locations-list-');
    const locationJobs = await getLocationJobs(items);

    return (
        <>
            <Map items={items} />
            <div {...attributes} id={contentListId} className={wrapperCss}>
                {items.map((item, index) => {
                    const title = getPropertyValue<string>(item, 'Title') || '';
                    const hours = getPropertyValue<string>(item, 'Hours') || '';
                    const locationAddress = getPropertyValue<LocationAddress>(item, 'LocationAddress');
                    const additionalHours = getPropertyValue<string>(item, 'AdditionalHours') || '';
                    const amenities = item.Original.Amenities;
                    const image = getPropertyValue<Image[]>(item, 'Images');
                    const address = getAddressString(locationAddress);
                    const jobs = locationJobs.filter((job) => job.ParentId === item.Original.Id);
                    const { href } = getDetailsHref({
                        item,
                        detailPageUrl: detailPageUrl,
                        detailPageMode: entity.DetailPageMode,
                        requestContext: requestContext,
                    });

                    return (
                        <>
                            <div key={index} className='row row-cols-1 row-cols-md-5 g-4 g-md-5 align-items-stretch'>
                                <div className='col-md-3'>
                                    {image && image.length > 0 && (
                                        <img
                                            className={combineClassNames('img-fluid', imagesCss)}
                                            src={image[0].Url}
                                            alt={sanitizeTemplateValue(image[0].AlternativeText)}
                                        />
                                    )}
                                </div>
                                <div className='col-md-4'>
                                    <h1 className={combineClassNames('mb-3 h4', titleCss)}>
                                        <Link className='text-decoration-none' href={href}>
                                            {sanitizeTemplateValue(title)}
                                        </Link>
                                    </h1>
                                    <div className={addressCss}>{sanitizeTemplateValue(address)}</div>
                                </div>

                                <div className='d-flex flex-column justify-content-between gap-4'>
                                    <div>
                                        <h6 className='mb-2 fw-normal text-uppercase'>{entity.HoursLabel}</h6>
                                        <div className={combineClassNames('mb-1', hoursCss)}>
                                            {sanitizeTemplateValue(hours)}
                                        </div>
                                        <div className={additionalHoursCss}>
                                            {sanitizeTemplateValue(additionalHours)}
                                        </div>
                                    </div>
                                    <div>
                                        <Amenities
                                            amenities={amenities}
                                            amenitiesListLabel={entity.AmenitiesListLabel}
                                            amenitiesIconList={entity.AmenitiesList}
                                            wrapperClassName='mb-2'
                                        />
                                    </div>
                                </div>

                                <div className='text-end'>
                                    {jobs.length > 0 && (
                                        <>
                                            <h5>{entity.OpenCareerHeading}</h5>
                                            <span>
                                                {jobs.length} {entity.OpenCareersLabel}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                            {index !== items.length - 1 && <hr />}
                        </>
                    );
                })}
            </div>
        </>
    );
};

const getLocationJobs = async (items: ContentListModelItems): Promise<CorianderLocation[]> => {
    const type = 'Telerik.Sitefinity.DynamicTypes.Model.Locations.Locationjob';
    const fields = ['Title', 'ParentId'];
    const ids = items.map((item) => item.Original.Id);

    let result: CorianderLocation[] = [];

    try {
        const data = await getItems<CorianderLocation>(
            type,
            {
                mainOperator: FilterMainOperator.Or,
                childOperator: FilterOperators.ContainsOr,
                fieldValues: { ParentId: ids },
            },
            fields,
        );

        result = data.Items;
    } catch (error) {
        console.error(error);
    }

    return result;
};

const getLocationMarkers = (items: ContentListModelItems): Pick<LocationAddress, 'Longitude' | 'Latitude'>[] => {
    return items.map((item) => {
        const address = getPropertyValue<LocationAddress>(item, 'LocationAddress');
        const { Longitude, Latitude } = address!;
        return { Longitude, Latitude };
    });
};

const getAddressString = (address: LocationAddress | null): string => {
    if (!address) {
        return '';
    }

    const { Street, City, StateCode, CountryCode } = address;
    const countryName = getCountryNameByCode(CountryCode);
    const stateName = getStateName(CountryCode, StateCode);

    return [Street, City, stateName, countryName].filter((aPart) => aPart).join(', ');
};

const Map = ({ items }: { items: ContentListModelItems }) => {
    const locationMarkers = getLocationMarkers(items);

    return (
        <MapWrapper
            maxZoom={19}
            icon={MAP_ICON_SETTINGS}
            center={[44.88, -37.85]}
            zoom={3}
            locations={locationMarkers}
            mapHeight='200px'
        />
    );
};
