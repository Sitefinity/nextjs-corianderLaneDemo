import { TAXON_ID, getDetailedItem, getTaxonItemsByIds, getUniqueId, sanitizeTemplateValue } from '@utils';
import { DetailedFoodItem } from '@interfaces';
import { BackLink } from '../../common/back-link/back-link';
import { CarouselIndicator, CarouselNavigation } from '../../common/carousel/carousel';
import { combineClassNames } from '@progress/sitefinity-nextjs-sdk';
import { CorianderContentListEntity } from '../../common/content-list-entity/coriander-content-list-entity';
import { ContentListDetailViewProps } from '@progress/sitefinity-nextjs-sdk/widgets';

export const DetailsFood = async ({
    detailItem,
    widgetContext,
    attributes,
}: ContentListDetailViewProps<CorianderContentListEntity>) => {
    const { requestContext, model } = widgetContext;
    const {
        Title: title = '',
        Description: description = '',
        Calories: calories = '',
        Price: price = 0,
        Id: detailedItemId,
        ingredients: ingredientIds,
    } = detailItem;

    const entity = model.Properties;
    const carouselId = getUniqueId('carousel-');
    const menuHref = '/' + requestContext.pageNode.ViewUrl.split('/')[1];
    const detailItemType = requestContext.detailItem?.ItemType || '';
    const [detailedItem] = await getDetailedItem<DetailedFoodItem>(detailItemType, [detailedItemId]);
    const ingredients = await getTaxonItemsByIds(ingredientIds, TAXON_ID.INGREDIENTS.id);
    const keyIngredients = ingredients.filter((ingredient) => ingredientIds.includes(ingredient.Id));
    const images = detailedItem.Images;
    const { className = '', ...restHtmlAttrs } = attributes;

    return (
        <section className={combineClassNames('row w100 cl-detailed-food', className)} {...restHtmlAttrs}>
            <div className='align-items-end d-flex justify-content-between mb-4'>
                <h1 className='mb-0'>{title}</h1>
                <BackLink href={menuHref} label={entity.BackMenuLabel || ''} />
            </div>
            <div className='d-flex justify-content-between flex-md-row flex-column-reverse cl-detailed-food__description'>
                <div className='cl-detailed-food__description -text mt-4 mt-md-0'>
                    <p className='mb-4'>{sanitizeTemplateValue(description)}</p>
                    <p>
                        <strong>{calories}</strong> {entity.CaloriesLabel}
                    </p>
                    <p>{price !== 0 && `$${sanitizeTemplateValue(price)}`}</p>
                    <div>
                        <p className='cl-txt-heading-size-xs cl-txt-light mb-2'>{entity.CaloriesLabel}</p>
                        <ul className='list-unstyled d-inline-flex flex-wrap w-100'>
                            {keyIngredients.map((ingredient, index) => (
                                <li key={index} className='badge p-2 rounded-pill cl-detailed-food__ingredient'>
                                    {sanitizeTemplateValue(ingredient.Title)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='cl-detailed-food__description -carousel'>
                    <div id={carouselId} className='carousel slide' data-bs-ride='carousel'>
                        <div className='carousel-indicators'>
                            {images.map((image, index) => (
                                <CarouselIndicator key={index} index={index} target={carouselId} ariaLabel={title} />
                            ))}
                        </div>
                        <div className='carousel-inner'>
                            {images.map((image, index) => {
                                return (
                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                        <img
                                            className='d-block w-100'
                                            src={image.Url}
                                            alt={sanitizeTemplateValue(image.AlternativeText)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <CarouselNavigation
                            target={carouselId}
                            prevLabel={entity.PreviousLabel || ''}
                            nextLabel={entity.NextLabel || ''}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
