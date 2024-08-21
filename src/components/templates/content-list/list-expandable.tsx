import { getContentListClasses, getPropertyValue, getUniqueId, sanitizeTemplateValue } from '@utils';
import { ContentListMasterViewProps } from '@progress/sitefinity-nextjs-sdk/widgets';
import { CorianderContentListEntity } from '../../common/content-list-entity/coriander-content-list-entity';

export const ListExpandable = ({
    attributes,
    items,
    widgetContext,
}: ContentListMasterViewProps<CorianderContentListEntity>) => {
    const { model } = widgetContext;
    const entity = model.Properties;
    const wrapperCss = getContentListClasses(entity);
    const contentListId = getUniqueId('cl-expandable-list-');
    return (
        <div {...attributes} className={wrapperCss}>
            <div className='accordion' id={contentListId}>
                {items.map((item, index) => {
                    const title = getPropertyValue<string>(item, 'Title') || '';
                    const text = getPropertyValue<string>(item, 'Text');
                    const headingId = `heading${item.Original.Id}`;
                    const collapseId = `collapse${item.Original.Id}`;
                    return (
                        <div className='accordion-item' key={index}>
                            <h2 className='accordion-header' id={headingId}>
                                <button
                                    className='h6 accordion-button collapsed'
                                    type='button'
                                    data-bs-toggle='collapse'
                                    data-bs-target={`#${collapseId}`}
                                    aria-expanded='false'
                                    aria-controls={collapseId}
                                    sfdi-trigger='click'
                                    sfdi-predicate='Expand list'
                                    sfdi-object={sanitizeTemplateValue(title)}
                                >
                                    {sanitizeTemplateValue(title)}
                                </button>
                            </h2>
                            <div
                                id={collapseId}
                                className='accordion-collapse collapse'
                                aria-labelledby={headingId}
                                data-bs-parent={`#${contentListId}`}
                            >
                                {text && (
                                    <div
                                        className='accordion-body'
                                        dangerouslySetInnerHTML={{ __html: sanitizeTemplateValue(text) }}
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
