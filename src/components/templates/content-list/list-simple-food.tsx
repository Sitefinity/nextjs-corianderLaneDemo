import { combineClassNames } from '@progress/sitefinity-nextjs-sdk';
import { addInlineBackgroundImage, getDetailsHref, getImageUrlsFromItems, sanitizeTemplateValue } from '@utils';
import Link from 'next/link';
import { ContentListMasterViewProps } from '@progress/sitefinity-nextjs-sdk/widgets';
import { CorianderContentListEntity } from '../../common/content-list-entity/coriander-content-list-entity';

export const ListSimpleFood = async ({
    attributes,
    detailPageUrl,
    items,
    widgetContext,
}: ContentListMasterViewProps<CorianderContentListEntity>) => {
    const { model, requestContext } = widgetContext;
    const entity = model.Properties;
    const imageSrcList: string[] = getImageUrlsFromItems(items);
    const { className: wrapperClasses, ...htmlAttributes } = attributes;

    return (
        <section {...htmlAttributes} className={combineClassNames('row row-cols-1 row-cols-lg-3', wrapperClasses)}>
            {items.map((item, index) => {
                const { href } = getDetailsHref({
                    item,
                    detailPageUrl: detailPageUrl,
                    detailPageMode: entity.DetailPageMode,
                    requestContext: requestContext,
                });
                return (
                    <Link key={index} href={href}>
                        <div className='menu-item-details mb-3'>
                            <div className='card rounded-0 cl-food-card'>
                                <div
                                    className='cl-food-card__img-wrapper'
                                    {...addInlineBackgroundImage(imageSrcList[index])}
                                />
                                <h3 className='cl-food-card__title align-items-center d-flex justify-content-center m-0'>
                                    {sanitizeTemplateValue(item.Heading.Value)}
                                </h3>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </section>
    );
};
