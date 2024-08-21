import { getDetailedItem, sanitizeTemplateValue } from '@utils';
import { DetailEvent } from '@interfaces';
import { ContentListDetailViewProps, formatDate } from '@progress/sitefinity-nextjs-sdk/widgets';
import { CorianderContentListEntity } from '../../common/content-list-entity/coriander-content-list-entity';

export const DetailsEvents = async ({
    detailItem,
    widgetContext,
    attributes,
}: ContentListDetailViewProps<CorianderContentListEntity>) => {
    const { requestContext, model } = widgetContext;
    const {
        Title: title = '',
        EventStart: eventStart = '',
        EventEnd: hasEventEnd = '',
        Id: detailedItemId,
        City: city = '',
        Country: country = '',
        Street: street = '',
        ContactName: contactName = '',
        ContactPhone: contactPhone = '',
        ContactCell: contactCell = '',
        ContactEmail: contactEmail = '',
        ContactWeb: contactWeb = '',
        Summary: summary = '',
        Content: content = '',
    } = detailItem;

    const entity = model.Properties;
    const detailItemType = requestContext.detailItem?.ItemType || '';
    const [detailedItem] = await getDetailedItem<DetailEvent>(detailItemType, [detailedItemId]);
    const parent = detailedItem.Parent;
    const calendarColor = parent.Color;
    const calendarTitle = parent.Title;

    return (
        <div {...attributes}>
            <h1>{sanitizeTemplateValue(title)}</h1>
            <div className='d-flex align-items-center mb-5'>
                <span
                    className='rounded-circle me-1'
                    style={{ background: calendarColor, height: '15px;', width: '15px;' }}
                ></span>
                <span>{sanitizeTemplateValue(calendarTitle)}</span>
            </div>
            <div className='mb-4'>
                <div className='cl-txt-light text-uppercase cl-txt-heading-size-xs mb-1'>{entity.TimeAndDateLabel}</div>
                <time>
                    {entity.EventStartAtLabel}: {formatDate(eventStart, requestContext.culture)}
                </time>

                {hasEventEnd && (
                    <>
                        <br />
                        <time>
                            {entity.EventEndAtLabel}: {formatDate(hasEventEnd, requestContext.culture)}
                        </time>
                    </>
                )}
            </div>
            {(city || country) && <Address {...{ country, city, street }} locationLabel={entity.LocationLabel} />}
            <div className='mb-4'>
                <div className='cl-txt-light text-uppercase cl-txt-heading-size-xs mb-1'>{entity.HostLabel}</div>
                {contactName && (
                    <>
                        {sanitizeTemplateValue(contactName)}
                        <br />
                    </>
                )}
                {contactPhone && (
                    <>
                        {sanitizeTemplateValue(contactPhone)}
                        <br />
                    </>
                )}
                {contactCell && (
                    <>
                        {sanitizeTemplateValue(contactCell)}
                        <br />
                    </>
                )}
                {contactEmail && (
                    <address>
                        <a href={`mailto:${sanitizeTemplateValue(contactEmail)}`} target='_blank'>
                            {sanitizeTemplateValue(contactEmail)}
                        </a>
                    </address>
                )}
                {contactWeb && (
                    <a href={sanitizeTemplateValue(contactWeb)} target='_blank'>
                        {sanitizeTemplateValue(contactWeb)}
                    </a>
                )}
            </div>
            {summary && (
                <>
                    <h2>{entity.SummaryLabel}</h2>
                    <p className='mb-4'>{sanitizeTemplateValue(summary)}</p>
                    <hr />
                </>
            )}
            {content && <p>{sanitizeTemplateValue(content)}</p>}
        </div>
    );
};

const Address = ({
    city,
    country,
    street,
    locationLabel = '',
}: {
    city: string;
    country: string;
    street: string;
    locationLabel: string | null;
}) => {
    let countryCityTemplate;
    if (city && country) {
        countryCityTemplate = (
            <>
                {sanitizeTemplateValue(city)} <span>,</span> {sanitizeTemplateValue(country)}
                <br />
            </>
        );
    } else {
        countryCityTemplate = (
            <>
                {sanitizeTemplateValue(city || country)}
                <br />
            </>
        );
    }
    return (
        <div className='mb-4'>
            <div className='cl-txt-light text-uppercase cl-txt-heading-size-xs mb-1'>{locationLabel}</div>
            <address>
                {countryCityTemplate}
                {sanitizeTemplateValue(street)}
            </address>
        </div>
    );
};
