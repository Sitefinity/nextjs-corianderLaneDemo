import { ContentListMasterViewProps } from '@progress/sitefinity-nextjs-sdk/widgets';
import { CorianderContentListEntity } from '../components/common/content-list-entity/coriander-content-list-entity';
import { LatLngExpression } from 'leaflet';

export interface MapProps {
    maxZoom?: number;
    center: LatLngExpression;
    zoom: number;
    icon: {
        iconSize: number[] | readonly number[];
        iconUrl: string | string;
        iconAnchor: number[] | readonly number[];
    };
    locations: Pick<LocationAddress, 'Longitude' | 'Latitude'>[];
    mapHeight: string;
}

export type ContentListModelItems = ContentListMasterViewProps<CorianderContentListEntity>['items'];
export type ContentListModelItem = ContentListModelItems[0];

export interface ParentItem {
    Id: string;
    LastModified: string;
    PublicationDate: string;
    DateCreated: string;
    IncludeInSitemap: boolean;
    SystemSourceKey: null;
    UrlName: string;
    ItemDefaultUrl: string;
    MetaTitle: string;
    Hours: string;
    MetaDescription: string;
    countries: string[];
    OpenGraphTitle: string;
    Amenities: string;
    Title: string;
    AdditionalHours: string;
    OpenGraphDescription: string;
    Provider: string;
    LocationAddress: LocationAddress;
    FeaturedFood: any[];
    OpenGraphImage: any[];
    Images: Image[];
}

export interface DetailNews {
    Id: string;
    LastModified: string;
    PublicationDate: string;
    Title: string;
    Description: string;
    DateCreated: string;
    IncludeInSitemap: boolean;
    SystemSourceKey: null;
    UrlName: string;
    ItemDefaultUrl: string;
    Tags: string[];
    MetaDescription: string;
    OpenGraphTitle: string;
    MetaTitle: string;
    OpenGraphDescription: string;
    Category: string[];
    AllowComments: boolean;
    Summary: string;
    Content: string;
    Author: string;
    SourceName: null;
    SourceSite: null;
    Provider: string;
    Comments: any[];
    Image: Image[];
    RelatedNews: RelatedNews[];
    OpenGraphVideo: any[];
    OpenGraphImage: any[];
}

export interface RelatedNews {
    Id: string;
    LastModified: string;
    PublicationDate: string;
    Title: string;
    Description: string;
    DateCreated: string;
    IncludeInSitemap: boolean;
    SystemSourceKey: null;
    UrlName: string;
    ItemDefaultUrl: string;
    Tags: string[];
    MetaDescription: string;
    OpenGraphTitle: string;
    MetaTitle: string;
    OpenGraphDescription: string;
    Category: string[];
    AllowComments: boolean;
    Summary: string;
    Content: string;
    Author: string;
    SourceName: null;
    SourceSite: null;
    Provider: string;
    Comments: any[];
}

export interface Image {
    Id: string;
    LastModified: string;
    PublicationDate: string;
    Title: string;
    Description: string;
    DateCreated: string;
    IncludeInSitemap: boolean;
    SystemSourceKey: null;
    Ordinal: number;
    UrlName: string;
    ItemDefaultUrl: string;
    Author: string;
    Extension: string;
    MimeType: string;
    TotalSize: number;
    IsOptimized: boolean;
    Category: any[];
    Tags: any[];
    AllowComments: boolean;
    Width: number;
    Height: number;
    AlternativeText: string;
    FolderId: null;
    ParentId: string;
    Provider: string;
    Url: string;
    ThumbnailUrl: string;
    IsDamMedia: boolean;
    Comments: any[];
    Thumbnails: Thumbnail[];
}

export interface Thumbnail {
    Title: string;
    Url: string;
    Width: number;
    Height: number;
    MimeType: string;
}

export interface LocationAddress {
    Id: string;
    CountryCode: string;
    StateCode: string;
    City: string;
    Zip: string;
    Street: string;
    Latitude: number;
    Longitude: number;
    MapZoomLevel: number;
}

export interface CorianderLocation {
    Id: string;
    LastModified: string;
    PublicationDate: string;
    DateCreated: string;
    IncludeInSitemap: boolean;
    SystemSourceKey: null;
    UrlName: string;
    ItemDefaultUrl: string;
    OpenGraphTitle: string;
    MetaTitle: string;
    Summary: string;
    MetaDescription: string;
    jobdivisions: string[];
    OpenGraphDescription: string;
    Title: string;
    Description: string;
    ParentId: string;
    Provider: string;
    Parent: LocationParent;
    OpenGraphImage: any[];
}
interface LocationParent {
    Id: string;
    LastModified: string;
    PublicationDate: string;
    DateCreated: string;
    IncludeInSitemap: boolean;
    SystemSourceKey: null;
    UrlName: string;
    ItemDefaultUrl: string;
    MetaTitle: string;
    Hours: string;
    MetaDescription: string;
    countries: string[];
    OpenGraphTitle: string;
    Amenities: string;
    Title: string;
    AdditionalHours: string;
    OpenGraphDescription: string;
    Provider: string;
    LocationAddress: LocationAddress;
}

export type States = { [key: string]: { [key: string]: string } };

export interface DetailedFoodItem {
    Id: string;
    LastModified: string;
    PublicationDate: string;
    DateCreated: string;
    IncludeInSitemap: boolean;
    SystemSourceKey: null;
    UrlName: string;
    ItemDefaultUrl: string;
    Calories: number;
    Title: string;
    ingredients: string[];
    Price: number;
    MetaDescription: string;
    MetaTitle: string;
    OpenGraphDescription: string;
    OpenGraphTitle: string;
    Description: string;
    Provider: string;
    OpenGraphImage: any[];
    Images: Image[];
}

export interface DetailedLocationItem {
    Id: string;
    LastModified: string;
    PublicationDate: string;
    DateCreated: string;
    IncludeInSitemap: boolean;
    SystemSourceKey: null;
    UrlName: string;
    ItemDefaultUrl: string;
    MetaTitle: string;
    Hours: string;
    MetaDescription: string;
    countries: string[];
    OpenGraphTitle: string;
    Amenities: string;
    Title: string;
    AdditionalHours: string;
    OpenGraphDescription: string;
    Provider: string;
    LocationAddress: LocationAddress;
    FeaturedFood: any[];
    OpenGraphImage: any[];
    Images: Image[];
}

export interface DetailEvent {
    Id: string;
    LastModified: string;
    PublicationDate: string;
    Title: string;
    Description: string;
    DateCreated: string;
    IncludeInSitemap: boolean;
    SystemSourceKey: null;
    UrlName: string;
    ItemDefaultUrl: string;
    Tags: any[];
    Category: any[];
    AllowComments: boolean;
    EventStart: string;
    EventEnd: null;
    ContactEmail: null;
    ContactWeb: null;
    Street: string;
    City: string;
    Country: string;
    State: string;
    ContactName: string;
    ContactCell: string;
    ContactPhone: string;
    Content: string;
    Summary: string;
    IsRecurrent: boolean;
    RecurrenceExpression: string;
    TimeZoneId: string;
    AllDayEvent: boolean;
    Location: null;
    ParentId: string;
    Provider: string;
    EventStartUtcOffset: number;
    EventEndUtcOffset: number;
    EventStartWithOffset: string;
    EventEndWithOffset: null;
    Comments: any[];
    Parent: Parent;
}

interface Parent {
    Id: string;
    LastModified: string;
    PublicationDate: string;
    UrlName: string;
    DateCreated: string;
    Title: string;
    Description: string;
    Color: string;
    ExpirationDate: null;
    Provider: string;
}

export interface ClassificationToken {
    Id: string;
    Name: string;
    Title: string;
    UrlName: string;
    Description: null;
    LastModified: string;
    AvailableLanguages: any[];
    TaxonomyId: string;
    Synonym: null;
    AppliedTo: number;
    SubTaxa: any[];
}

export interface LinkFieldData {
    id: string;
    href: string;
    sfref: null;
    text: string;
    target: null;
    queryParams: string;
    anchor: string;
    tooltip: null;
    type: string;
    classList: any[];
    attributes: null;
}

export interface FilterRules {
    mainOperator?: FilterMainOperator;
    childOperator: FilterOperators;
    fieldValues: { [key: string]: any[] };
}

export enum FilterMainOperator {
    And = 'AND',
    Or = 'OR',
    Not = 'NOT',
}

export interface CombinedFilter {
    Operator: 'AND' | 'OR' | 'NOT';
    ChildFilters: FilterClause[];
}

export interface FilterClause {
    FieldName: string;
    FieldValue: any;
    Operator: FilterOperators | string;
}

export enum FilterOperators {
    Equal = 'eq',
    NotEqual = 'ne',
    GreaterThan = 'gt',
    LessThan = 'lt',
    GreaterThanOrEqual = 'ge',
    LessThanOrEqual = 'le',
    ContainsOr = 'any+or',
    ContainsAnd = 'any+and',
    DoesNotContain = 'not+(any+or)',
}

export interface LocationResponse {
    value: LocationValue[];
}

export interface LocationValue {
    Title: string;
    LiveUrl: string;
    Url: string;
}
