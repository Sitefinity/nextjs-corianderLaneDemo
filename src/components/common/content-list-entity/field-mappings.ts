import { ViewMetaModel } from '@progress/sitefinity-widget-designers-sdk';

const originalContentListMapping = {
    CardsList: [
        { fieldTitle: 'Image', fieldType: 'RelatedImage' },
        { fieldTitle: 'Title', fieldType: 'ShortText' },
        { fieldTitle: 'Text', fieldType: 'Text' },
    ],
    ListWithSummary: [
        { fieldTitle: 'Title', fieldType: 'ShortText' },
        { fieldTitle: 'Text', fieldType: 'Text' },
        { fieldTitle: 'Publication date', fieldType: 'DateTime' },
    ],
    ListWithImage: [
        { fieldTitle: 'Title', fieldType: 'ShortText' },
        { fieldTitle: 'Image', fieldType: 'RelatedImage' },
        { fieldTitle: 'Text', fieldType: 'Text' },
    ],
};

const corianderContentListMapping = {
    ImageCarousel: [
        { fieldTitle: 'Headline', fieldType: 'ShortText' },
        { fieldTitle: 'Subheadline', fieldType: 'ShortText' },
        { fieldTitle: 'Image', fieldType: 'RelatedImage' },
    ],
    ListSimpleFood: [
        { fieldTitle: 'Heading', fieldType: 'ShortText' },
        { fieldTitle: 'Images', fieldType: 'RelatedImage' },
        { fieldTitle: 'Calories', fieldType: 'Number' },
    ],
    ListNews: [
        { fieldTitle: 'Title', fieldType: 'ShortText' },
        { fieldTitle: 'Content', fieldType: 'Text' },
        { fieldTitle: 'Publication date', fieldType: 'DateTime' },
        { fieldTitle: 'Summary', fieldType: 'Text' },
        { fieldTitle: 'Images', fieldType: 'RelatedImage' },
    ],
    ListCareersWithLocation: [
        { fieldTitle: 'Title', fieldType: 'ShortText' },
        { fieldTitle: 'PublicationDate', fieldType: 'DateTime' },
        { fieldTitle: 'Summary', fieldType: 'Text' },
    ],
    ListLocations: [
        { fieldTitle: 'Title', fieldType: 'ShortText' },
        { fieldTitle: 'Hours', fieldType: 'ShortText' },
        { fieldTitle: 'Additional hours', fieldType: 'ShortText' },
        { fieldTitle: 'Images', fieldType: 'RelatedImage' },
        { fieldTitle: 'Location address', fieldType: 'Address' },
    ],

    ListExpandable: [
        { fieldTitle: 'Title', fieldType: 'ShortText' },
        { fieldTitle: 'Text', fieldType: 'Text' },
    ],
    ListCareers: [
        { fieldTitle: 'Title', fieldType: 'ShortText' },
        { fieldTitle: 'PublicationDate', fieldType: 'DateTime' },
        { fieldTitle: 'Summary', fieldType: 'Text' },
    ],
    ListDetailedFood: [
        { fieldTitle: 'Heading', fieldType: 'ShortText' },
        { fieldTitle: 'Images', fieldType: 'RelatedImage' },
        { fieldTitle: 'Calories', fieldType: 'Number' },
        { fieldTitle: 'Description', fieldType: 'LongText' },
    ],
    ListAllPosts: [
        { fieldTitle: 'Title', fieldType: 'ShortText' },
        { fieldTitle: 'PublicationDate', fieldType: 'DateTime' },
        { fieldTitle: 'Summary', fieldType: 'Text' },
        { fieldTitle: 'Content', fieldType: 'LongText' },
    ],
};

export const viewMeta: ViewMetaModel = { ...originalContentListMapping, ...corianderContentListMapping };
