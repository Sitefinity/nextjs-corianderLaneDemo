import { combineClassNames } from '@progress/sitefinity-nextjs-sdk';
import { getContentListClasses, getLinkAttributes, getUniqueId, sanitizeTemplateValue } from '@utils';
import { Image, Thumbnail } from '@interfaces';
import { CarouselIndicator, CarouselNavigation } from '../../common/carousel/carousel';
import { ContentListMasterViewProps } from '@progress/sitefinity-nextjs-sdk/widgets';
import { CorianderContentListEntity } from '../../common/content-list-entity/coriander-content-list-entity';

export const ImageCarousel = ({
    attributes,
    items,
    widgetContext,
}: ContentListMasterViewProps<CorianderContentListEntity>) => {
    const { model } = widgetContext;
    const entity = model.Properties;
    const carouselId = getUniqueId('carousel-');
    const contentListClasses = getContentListClasses(entity);

    return (
        <div
            {...attributes}
            id={carouselId}
            className={combineClassNames('carousel slide sliderCarousel', contentListClasses)}
        >
            <div className='carousel-indicators'>
                {items.map((item, index) => (
                    <CarouselIndicator
                        key={index}
                        index={index}
                        target={carouselId}
                        ariaLabel={sanitizeTemplateValue(item?.Title?.Value)}
                    />
                ))}
            </div>
            <div className='carousel-inner overflow-hidden'>
                {items.map((item, index) => {
                    const contentLocation = item.Original.ContentLocation;
                    let link = item.Original.LinkField;
                    if (link) {
                        link = JSON.parse(link)[0];
                    }

                    const linkAttributes = getLinkAttributes(link);
                    return (
                        <div
                            key={index}
                            className={combineClassNames(
                                'carousel-item overflow-hidden w-100 position-relative carouselItemWrp',
                                index === 0 ? 'active' : '',
                            )}
                        >
                            <div className='w-100 h-100 mh-100 position-absolute overlay' />
                            <a className='text-white' {...linkAttributes}>
                                <div className='item-view mh-100'>
                                    <div
                                        className={`carousel-caption cl-carousel-header-wrapper text-${contentLocation}`}
                                    >
                                        <h1 className='cl-txt-white display-3'>
                                            {sanitizeTemplateValue(item.Headline.Value)}
                                        </h1>
                                        <p className='cl-txt-heading-size-m cl-txt-white'>
                                            {sanitizeTemplateValue(item.Subheadline.Value)}
                                        </p>
                                    </div>
                                </div>
                            </a>
                            <CarouselPicture image={item.Original?.Image[0]} imageAttributes={attributes} />
                        </div>
                    );
                })}
            </div>

            <CarouselNavigation target={carouselId} prevLabel='' nextLabel='' />
        </div>
    );
};

const CarouselPicture = ({ image, imageAttributes }: { image: Image; imageAttributes: { [key: string]: any } }) => {
    if (!image) {
        return null;
    }

    const thumbnails = image.Thumbnails.sort((a: Thumbnail, b: Thumbnail) => a.Width - b.Width);
    const { Width, Height, AlternativeText, Url, Title } = image;
    // TODO: Add image CSS for the picture tag var imageCss = Model.GetFieldCss("Image")
    return (
        <picture>
            {thumbnails.map((thumbnail: Thumbnail, index: number) => {
                const sourceWidthAttr = Width > 0 && thumbnail.Width !== Width ? thumbnail.Width : 0;
                const sourceHeightAttr = Height > 0 && thumbnail.Height !== Height ? thumbnail.Height : 0;
                if (sourceWidthAttr && sourceHeightAttr) {
                    return (
                        <source
                            key={index}
                            media={`max-width: ${thumbnail.Width}px`}
                            srcSet={thumbnail.Url}
                            type={thumbnail.MimeType}
                            width={sourceWidthAttr}
                            height={sourceHeightAttr}
                        />
                    );
                }

                return null;
            })}

            <img
                className='w-100'
                {...imageAttributes}
                src={Url}
                title={Title}
                alt={sanitizeTemplateValue(AlternativeText)}
            />
        </picture>
    );
};
