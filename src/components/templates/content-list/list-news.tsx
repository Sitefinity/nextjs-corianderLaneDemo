import { combineClassNames } from '@progress/sitefinity-nextjs-sdk';
import { ContentListMasterViewProps, OpenDetailsAnchor, formatDate } from '@progress/sitefinity-nextjs-sdk/widgets';
import { addInlineBackgroundImage, getContentListClasses, getImageUrlsFromItems, sanitizeTemplateValue } from '@utils';
import { CorianderContentListEntity } from '../../common/content-list-entity/coriander-content-list-entity';

export const ListNews = ({
    attributes,
    detailPageUrl,
    items,
    widgetContext,
}: ContentListMasterViewProps<CorianderContentListEntity>) => {
    const { model, requestContext } = widgetContext;
    const entity = model.Properties;
    const imageSrcList: string[] = getImageUrlsFromItems(items);
    const { className = '', ...wrapperAttributes } = attributes;
    let classes = combineClassNames('row row-cols-md-1', className);
    const contentListClasses = getContentListClasses(entity);
    classes = combineClassNames(classes, contentListClasses);

    return (
        <section {...wrapperAttributes} className={classes}>
            {items.map((item, index: number) => (
                <article key={index} className='card rounded-0 border-0 bg-transparent cl-news-card mb-3 mb-md-0'>
                    <div className='cl-news-card__img-wrapper' {...addInlineBackgroundImage(imageSrcList[index])}>
                        <OpenDetailsAnchor
                            detailPageMode={entity.DetailPageMode}
                            detailPageUrl={detailPageUrl}
                            requestContext={requestContext}
                            className='d-block h-100 pe-auto position-relative z-1'
                            item={{
                                ...item,
                                Title: { ...item.Title, Value: '' },
                                Original: { ...item.Original, Title: '' },
                            }}
                            text={''}
                        />
                    </div>
                    <div className='cl-news-card__img-overlay' />
                    <div className='text-muted my-3 cl-news-card__date'>
                        {formatDate(item.PublicationDate.Value, requestContext.culture)}
                    </div>
                    <h3 className='mb-2'>
                        {detailPageUrl ? (
                            <OpenDetailsAnchor
                                detailPageMode={entity.DetailPageMode}
                                detailPageUrl={detailPageUrl}
                                requestContext={requestContext}
                                className='text-decoration-none cl-txt-dark cl-news-card__title'
                                item={item}
                            />
                        ) : (
                            sanitizeTemplateValue(item.Title?.Value || '')
                        )}
                    </h3>
                    <p className='lh-base cl-news-card__summary'>{sanitizeTemplateValue(item.Summary?.Value || '')}</p>
                    <OpenDetailsAnchor
                        detailPageMode={entity.DetailPageMode}
                        detailPageUrl={detailPageUrl}
                        requestContext={requestContext}
                        className='text-decoration-none cl-news-card__link'
                        item={item}
                        text='Continue Reading'
                    />
                </article>
            ))}
        </section>
    );
};
