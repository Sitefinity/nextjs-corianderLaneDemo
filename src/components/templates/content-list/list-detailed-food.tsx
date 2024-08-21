import {
    TAXON_ID,
    addInlineBackgroundImage,
    getContentListClasses,
    getDetailsHref,
    getPropertyValue,
    getRelatedTaxonItems,
    sanitizeTemplateValue,
} from '@utils';
import { ContentListModelItem, Thumbnail } from '@interfaces';
import { TaxonDto } from '@progress/sitefinity-nextjs-sdk/rest-sdk';
import { combineClassNames } from '@progress/sitefinity-nextjs-sdk';
import Link from 'next/link';
import { ReactNode } from 'react';
import { BackLink } from '../../common/back-link/back-link';
import { ContentListMasterViewProps } from '@progress/sitefinity-nextjs-sdk/widgets';
import { CorianderContentListEntity } from '../../common/content-list-entity/coriander-content-list-entity';

export const ListDetailedFood = async ({
    attributes,
    detailPageUrl,
    items,
    widgetContext,
}: ContentListMasterViewProps<CorianderContentListEntity>) => {
    const { model, requestContext } = widgetContext;
    const entity = model.Properties;
    const wrapperCss = getContentListClasses(entity);
    const bsClasses = 'row row-cols-1';
    const ingredients = await getRelatedTaxonItems(items, TAXON_ID.INGREDIENTS.label, TAXON_ID.INGREDIENTS.id);
    const pageUrlSegment = 'menu';
    const backLabel = entity.BackMenuLabel || '';
    const isFilterApplied = requestContext.url !== pageUrlSegment;

    return (
        <>
            {isFilterApplied && <BackToMenuLink backLabel={backLabel} backUrl={`/${pageUrlSegment}`} />}
            <section {...attributes} className={combineClassNames(wrapperCss, bsClasses)}>
                {items.map((item, index) => {
                    const thumbnail = getThumbnailUrl(item);
                    const title = getPropertyValue<string>(item, 'Title') || '';
                    const calories = getPropertyValue<number>(item, 'Calories') || '';
                    const description = getPropertyValue<string>(item, 'Description') || '';
                    const itemIngredientIds = getPropertyValue<string[]>(item, 'Ingredients') || [];
                    const itemIngredients = getItemIngredients(itemIngredientIds, ingredients);
                    const price = item.Original.Price;
                    const { href } = getDetailsHref({
                        item,
                        detailPageUrl: detailPageUrl,
                        detailPageMode: entity.DetailPageMode,
                        requestContext: requestContext,
                    });

                    return (
                        <Link className='menu-item-details mb-3 d-flex' key={index} href={href}>
                            <div className='card rounded-0 cl-food-card w-100'>
                                <div className='cl-food-card__img-wrapper' {...addInlineBackgroundImage(thumbnail)} />
                                <div className='p-3'>
                                    <h2 className='h3 cl-food-card__details-title'>{title}</h2>
                                    <div className='row'>
                                        <p className='col-6'>
                                            <strong>{sanitizeTemplateValue(calories)}</strong> {entity.CaloriesLabel}
                                        </p>
                                        <div className='col-6 text-end'>
                                            {price && price !== 0 ? `$${sanitizeTemplateValue(price)}` : ''}
                                        </div>
                                    </div>
                                    <p className='cl-food-card__description'>{sanitizeTemplateValue(description)}</p>
                                    <div>
                                        <p className='cl-txt-heading-size-xs cl-txt-light mb-2 text-uppercase'>
                                            {entity.KeyIngredientsLabel}
                                        </p>
                                        <ul className='list-unstyled d-inline-flex flex-wrap w-100'>
                                            {itemIngredients.map((itemIngredient, index) => (
                                                <li
                                                    className='badge p-2 rounded-pill cl-food-card__ingredient'
                                                    key={index}
                                                >
                                                    {sanitizeTemplateValue(itemIngredient.Title)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </section>
        </>
    );
};

const getThumbnailUrl = (item: ContentListModelItem) => {
    const thumbnails: Thumbnail[] = item.Images?.Value[0].Thumbnails;
    if (!thumbnails) {
        return '';
    }

    const thumbnail = thumbnails.find((t) => t.Title === 'food-list');

    if (!thumbnail) {
        return '';
    }

    return thumbnail.Url;
};

const getItemIngredients = (ids: string[], ingredients: TaxonDto[]) => {
    return ingredients.filter((i) => ids.includes(i.Id));
};

const BackToMenuLink = ({ backLabel, backUrl }: { backLabel: string; backUrl: string }): ReactNode => (
    <div className='row mb-3'>
        <div className='col-md-12'>
            <BackLink href={backUrl} className='backToMenuLink' label={backLabel} />
        </div>
    </div>
);
