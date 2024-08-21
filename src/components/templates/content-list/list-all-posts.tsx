import {
    getContentListClasses,
    getDetailsHref,
    getFieldClasses,
    getPropertyValue,
    getUniqueId,
    sanitizeTemplateValue,
} from '@utils';
import { combineClassNames } from '@progress/sitefinity-nextjs-sdk';
import { ContentListMasterViewProps, formatDate } from '@progress/sitefinity-nextjs-sdk/widgets';
import Link from 'next/link';
import { CorianderContentListEntity } from '../../common/content-list-entity/coriander-content-list-entity';

export const ListAllPosts = ({
    attributes,
    detailPageUrl,
    items,
    widgetContext,
}: ContentListMasterViewProps<CorianderContentListEntity>) => {
    const { model, requestContext } = widgetContext;
    const entity = model.Properties;
    const wrapperCss = getContentListClasses(entity);
    const titleCss = getFieldClasses(entity, 'Title');
    const publicationDateCss = getFieldClasses(entity, 'PublicationDate');
    const summaryCss = getFieldClasses(entity, 'Summary');
    const contentListId = getUniqueId('cl-all-posts-list-');
    const culture = requestContext.culture;

    return (
        <div {...attributes} className={wrapperCss} id={contentListId}>
            {items.map((item, index) => {
                const title = getPropertyValue<string>(item, 'Title');
                const publicationDate = getPropertyValue<string>(item, 'PublicationDate') || '';
                const summary = getPropertyValue<string>(item, 'Summary');
                const { href } = getDetailsHref({
                    item,
                    detailPageUrl: detailPageUrl,
                    detailPageMode: entity.DetailPageMode,
                    requestContext: requestContext,
                });

                return (
                    <>
                        <div key={index}>
                            {title && (
                                <h2 className={combineClassNames('mb-2', titleCss)}>
                                    <Link className='cl-txt-dark text-decoration-none' href={href}>
                                        {sanitizeTemplateValue(title)}
                                    </Link>
                                </h2>
                            )}
                            <div className={combineClassNames('mb-4 text-muted', publicationDateCss)}>
                                {formatDate(publicationDate, culture)}
                            </div>
                            {summary && (
                                <p className={combineClassNames('mb-4', summaryCss)}>
                                    {sanitizeTemplateValue(summary)}
                                </p>
                            )}
                            {/* TODO: RenderLinks is null */}
                            {href.length > 0 && (
                                <Link href={href} className='btn btn-primary'>
                                    {entity.ReadTheStoryLabel}
                                </Link>
                            )}
                        </div>
                        {index !== items.length - 1 && <hr />}
                    </>
                );
            })}
        </div>
    );
};
