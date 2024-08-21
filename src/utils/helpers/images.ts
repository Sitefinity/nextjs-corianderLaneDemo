import { ContentListModelItems, Image } from '../../interfaces';

export const getImageUrlsFromItems = (items: ContentListModelItems) => {
    const images = getImagesFromItems(items);
    return images.map((image) => (image.Url ? image.Url : ''));
};

export const addInlineBackgroundImage = (imageSrc: string): {} | { style: { backgroundImage: string } } => {
    if (!imageSrc || !imageSrc.length) {
        return {};
    }

    return { style: { backgroundImage: formatBackgroundImageSrc(imageSrc) } };
};

const getImagesFromItems = (items: ContentListModelItems): Image[] => {
    const defaultValue: Image[] = [];
    if (!items.length) {
        return defaultValue;
    }

    return items.flatMap((item) => item.Images.Value);
};

const formatBackgroundImageSrc = (src: string) => `url('${src}')`;
