import { MAP_ICON_SETTINGS, getDetailedItem, sanitizeTemplateValue } from '@utils';
import { DetailedLocationItem, LocationAddress } from '@interfaces';
import { Amenities } from '../../common/amenities/amenities';
import { MapWrapper } from '../../map/map-wrapper';
import { CorianderContentListEntity } from '../../common/content-list-entity/coriander-content-list-entity';
import { ContentListDetailViewProps } from '@progress/sitefinity-nextjs-sdk/widgets';

export const DetailsLocations = async ({
    detailItem,
    widgetContext,
    attributes,
}: ContentListDetailViewProps<CorianderContentListEntity>) => {
    const { requestContext, model } = widgetContext;
    const {
        Title: title = '',
        LocationAddress: address,
        Hours: hours = '',
        AdditionalHours: additionalHours = '',
        Id: detailedItemId,
        Amenities: amenities,
    } = detailItem;

    const entity = model.Properties;
    const detailItemType = requestContext.detailItem?.ItemType || '';
    const [detailedItem] = await getDetailedItem<DetailedLocationItem>(detailItemType, [detailedItemId]);
    const [image] = detailedItem.Images;
    const { Latitude, Longitude } = detailedItem['LocationAddress'];

    return (
        <div {...attributes}>
            {title && <h1>{sanitizeTemplateValue(title)}</h1>}
            <div className='row row-cols-1 row-cols-md-3'>
                <div className='col-md-3'>
                    <img className='img-fluid' src={image.Url} alt={sanitizeTemplateValue(image.AlternativeText)} />
                </div>
                <div className='col-md-4 d-flex flex-column justify-content-between gap-4 mt-3 mt-md-0'>
                    <div>
                        <div>{sanitizeTemplateValue(address.Street)}</div>
                        <span>{sanitizeTemplateValue(address.City)},</span>
                        <span> {sanitizeTemplateValue(address.StateCode)} </span>
                        <span> {sanitizeTemplateValue(address.CountryCode)}</span>
                        <span>{sanitizeTemplateValue(address.Zip)}</span>
                        {hours && (
                            <div className='mt-3'>
                                <div className='cl-txt-light text-uppercase cl-txt-heading-size-xs mb-1'>
                                    {entity.HoursLabel}
                                </div>
                                <div className='mb-1'>{sanitizeTemplateValue(hours)}</div>
                                <div>{sanitizeTemplateValue(additionalHours)}</div>
                            </div>
                        )}
                    </div>
                    <div className='d-flex flex-column gap-2'>
                        <Amenities
                            amenities={amenities}
                            amenitiesListLabel={entity.AmenitiesListLabel}
                            amenitiesIconList={entity.AmenitiesList}
                        />
                    </div>
                </div>

                <div className='col-md-5'>
                    <Map markerCoordinates={[{ Latitude, Longitude }]} />
                </div>
            </div>
        </div>
    );
};

const Map = ({ markerCoordinates }: { markerCoordinates: Pick<LocationAddress, 'Longitude' | 'Latitude'>[] }) => {
    const { Latitude, Longitude } = markerCoordinates[0];

    return (
        <MapWrapper
            icon={MAP_ICON_SETTINGS}
            center={[Latitude, Longitude]}
            zoom={15}
            locations={markerCoordinates}
            mapHeight='200px'
        />
    );
};
