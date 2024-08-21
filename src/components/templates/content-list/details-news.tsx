import { combineClassNames } from '@progress/sitefinity-nextjs-sdk';
import { ContentListDetailViewProps, formatDate } from '@progress/sitefinity-nextjs-sdk/widgets';
import { addInlineBackgroundImage, getDetailedItem, getUniqueId, sanitizeTemplateValue } from '@utils';
import { DetailNews, RelatedNews } from '@interfaces';
import Link from 'next/link';
import { CorianderContentListEntity } from '../../common/content-list-entity/coriander-content-list-entity';

export const DetailsNews = async ({
    detailItem,
    widgetContext,
    attributes,
}: ContentListDetailViewProps<CorianderContentListEntity>) => {
    const { requestContext } = widgetContext;
    const headerId = getUniqueId('cl-news-details-h1-');
    const { className: wrapperClassCss = '', ...rest } = attributes;
    const detailedItemId = detailItem.Id;
    const viewUrl = requestContext.layout.Fields.ViewUrl;
    const detailItemType = requestContext.detailItem?.ItemType || '';
    const [detailedItem] = await getDetailedItem<DetailNews>(detailItemType, [detailedItemId]);
    const { RelatedNews, Image } = detailedItem;

    return (
        <>
            <div className={combineClassNames('cl-news-details', wrapperClassCss)} {...rest}>
                {detailItem.Title && (
                    <h1 className='my-5' id={headerId}>
                        {sanitizeTemplateValue(detailItem.Title)}
                    </h1>
                )}
                <div className='my-3 text-muted'>
                    {detailItem.Author.length > 0 && `By ${sanitizeTemplateValue(detailItem.Author)}`}
                    {detailItem.Author.length > 0 && <span className='cl-news-details__date-divider'>|</span>}
                    <span className='cl-news-details__date'>
                        {formatDate(detailItem.PublicationDate, requestContext.culture)}
                    </span>
                </div>
                <div className='mb-4'>
                    <img
                        className='img-fluid'
                        src={Image[0].Url}
                        alt={sanitizeTemplateValue(Image[0].AlternativeText)}
                    />
                </div>
                <div dangerouslySetInnerHTML={{ __html: sanitizeTemplateValue(detailItem?.Content) }} />
            </div>
            {detailedItem && (
                <ListRelatedNews
                    relatedNews={RelatedNews}
                    itemType={requestContext.detailItem!.ItemType}
                    viewUrl={viewUrl}
                    culture={requestContext.culture}
                />
            )}
        </>
    );
};

const ListRelatedNews = async (props: ListRelatedNewsProps) => {
    const { relatedNews, itemType, viewUrl, culture } = props;
    const relatedNewsIds = relatedNews.map((rNews) => rNews.Id);
    const relatedNewsData = await getDetailedItem<DetailNews>(itemType, relatedNewsIds);

    return (
        <>
            <hr />
            <h2 className='mb-5 mb-md-4 text-capitalize'>You might also like</h2>
            <div className='gap-5 mb-3 mb-md-0 cl-related-news'>
                {relatedNewsData.map((currentNews: DetailNews, index: number) => {
                    if (!currentNews) {
                        return null;
                    }
                    const currentNewsUrl = viewUrl + currentNews.ItemDefaultUrl;

                    return (
                        <article
                            key={index}
                            className='card rounded-0 border-0 bg-transparent cl-news-card mb-3 mb-md-0'
                        >
                            <div
                                className='cl-news-card__img-wrapper'
                                {...addInlineBackgroundImage(currentNews.Image[0].Url)}
                            >
                                <Link className='d-block h-100 pe-auto position-relative z-1' href={currentNewsUrl} />
                            </div>
                            <div className='cl-news-card__img-overlay' />
                            <div className='text-muted my-3 cl-news-card__date'>
                                {formatDate(currentNews.PublicationDate, culture)}
                            </div>
                            <h4 className='mb-2'>
                                <Link
                                    className='text-decoration-none cl-txt-dark cl-news-card__title'
                                    href={currentNewsUrl}
                                >
                                    {sanitizeTemplateValue(currentNews.Title)}
                                </Link>
                            </h4>
                            <p className='lh-base cl-news-card__summary'>
                                {sanitizeTemplateValue(currentNews.Summary)}
                            </p>
                        </article>
                    );
                })}
            </div>
        </>
    );
};

interface ListRelatedNewsProps {
    relatedNews: RelatedNews[];
    itemType: string;
    viewUrl: string;
    culture: string;
}
