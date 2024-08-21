import { ContentListDetailViewProps, formatDate } from '@progress/sitefinity-nextjs-sdk/widgets';
import { sanitizeTemplateValue } from '@utils';
import { CorianderContentListEntity } from '../../common/content-list-entity/coriander-content-list-entity';

export const DetailsPosts = ({
    detailItem,
    widgetContext,
    attributes,
}: ContentListDetailViewProps<CorianderContentListEntity>) => {
    const { requestContext, model } = widgetContext;
    const {
        Title: title = '',
        PublicationDate: publicationDate = '',
        Summary: summary = '',
        Content: content = '',
    } = detailItem;

    const entity = model.Properties;

    return (
        <div {...attributes}>
            {title && <h1>{sanitizeTemplateValue(title)}</h1>}
            <div className='text-muted mb-4'>{formatDate(publicationDate, requestContext.culture)}</div>
            {summary && (
                <>
                    <h2>{entity.SummaryLabel}</h2>
                    <div className='lh-base'>{sanitizeTemplateValue(summary)}</div>
                </>
            )}
            {content && (
                <>
                    <hr />
                    <div className='lh-base' dangerouslySetInnerHTML={{ __html: sanitizeTemplateValue(content) }} />
                </>
            )}
        </div>
    );
};
