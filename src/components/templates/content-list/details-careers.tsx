import { ContentListDetailViewProps, formatDate } from '@progress/sitefinity-nextjs-sdk/widgets';
import { TAXON_ID, getTaxonItemsByIds, sanitizeTemplateValue } from '@utils';
import { CorianderContentListEntity } from '../../common/content-list-entity/coriander-content-list-entity';
export const DetailsCareers = async ({
    detailItem,
    widgetContext,
    attributes,
}: ContentListDetailViewProps<CorianderContentListEntity>) => {
    const { requestContext, model } = widgetContext;
    const {
        Title: title = '',
        PublicationDate: publicationDate = '',
        Description: description = '',
        jobdivisions: jobDivisionIds = [],
    } = detailItem;

    const entity = model.Properties;
    const jobDivisionItems = await getTaxonItemsByIds(jobDivisionIds, TAXON_ID.JOB_DIVISIONS.id);
    const keyJobDivisions = jobDivisionItems.filter((jDivision) => jobDivisionIds.includes(jDivision.Id));

    return (
        <div {...attributes}>
            {title && <h1>{sanitizeTemplateValue(title)}</h1>}
            <div className='text-muted mb-4'>
                <strong>{entity.PostedLabel}</strong> {formatDate(publicationDate, requestContext.culture)}
            </div>
            <div className='d-flex justify-content-between align-items-start flex-column flex-md-row gap-5'>
                {description && <div dangerouslySetInnerHTML={{ __html: sanitizeTemplateValue(description) }} />}
                <div className='flex-shrink-0'>
                    {keyJobDivisions && keyJobDivisions.length > 0 && (
                        <>
                            <p className='text-muted text-uppercase small mb-1'>{entity.DivisionsLabel}</p>
                            <ul className='list-unstyled mb-3'>
                                {keyJobDivisions.map((jDivision, index) => (
                                    <li key={index} className='1'>
                                        {sanitizeTemplateValue(jDivision.Title)}
                                    </li>
                                ))}
                            </ul>
                            <a href='#opening-form' className='btn btn-primary'>
                                {entity.ApplyNowLabel}
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
