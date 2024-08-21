import { ContentListEntity } from '@progress/sitefinity-nextjs-sdk/widgets';
import {
    Category,
    ContentSection,
    ContentSectionTitles,
    DefaultValue,
    Description,
    DisplayName,
    FieldMapping,
    FieldMappings,
    PropertyCategory,
} from '@progress/sitefinity-widget-designers-sdk';
import { viewMeta } from './field-mappings';

export class CorianderContentListEntity extends ContentListEntity {
    @DisplayName('Field mapping')
    @ContentSection('Select content to display', 2)
    @Description('Specify which fields from the content type you have selected to be displayed in the list.')
    @FieldMappings(viewMeta)
    ListFieldMapping: Array<FieldMapping> | null = null;

    @DisplayName('Continue reading label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Continue reading')
    ContinueReadingLabel: string | null = null;

    @DisplayName('Read more label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Read more')
    ReadMoreLabel: string | null = null;

    @DisplayName('Amenities list label')
    @Description("List of all amenities. Use ',' (comma) to separate them.")
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Wifi, Drive Thru, Meeting Facilities')
    AmenitiesListLabel: string | null = null;

    @DisplayName('Hours label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Hours')
    HoursLabel: string | null = null;

    @DisplayName('Calories label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Calories')
    CaloriesLabel: string | null = null;

    @DisplayName('Back to menu label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Back to all menu items')
    BackMenuLabel: string | null = null;

    @DisplayName('Back to news label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Back to all news items')
    BackNewsLabel: string | null = null;

    @DisplayName('Key ingredients label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Key ingredients')
    KeyIngredientsLabel: string | null = null;

    @DisplayName('Apply now label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Apply now')
    ApplyNowLabel: string | null = null;

    @DisplayName('Read the story label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Read the story')
    ReadTheStoryLabel: string | null = null;

    @DisplayName('Time and date label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Time and date')
    TimeAndDateLabel: string | null = null;

    @DisplayName('Event start at label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Event start at')
    EventStartAtLabel: string | null = null;

    @DisplayName('Event end at label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Event end at')
    EventEndAtLabel: string | null = null;

    @DisplayName('Location label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Location')
    LocationLabel: string | null = null;

    @DisplayName('Host label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Host')
    HostLabel: string | null = null;

    @DisplayName('Summary label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Summary')
    SummaryLabel: string | null = null;

    @DisplayName('Posted label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Career posted: ')
    PostedLabel: string | null = null;

    @DisplayName('Previous label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Previous')
    PreviousLabel: string | null = null;

    @DisplayName('Next label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Next')
    NextLabel: string | null = null;

    @DisplayName('Divisions label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Divisions')
    DivisionsLabel: string | null = null;

    @DisplayName('You might also like label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('You might also like')
    YouMightAlsoLikeLabel: string | null = null;

    @DisplayName('Corporate news label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Corporate news')
    CorporateNewsLabel: string | null = null;

    @DisplayName('Open Career Heading')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Career Opportunities')
    OpenCareerHeading: string | null = null;

    @DisplayName('Open Careers Label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('open career(s)')
    OpenCareersLabel: string | null = null;

    @DisplayName('Render Links')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    RenderLinks: boolean = false;

    @DisplayName('Amenities List')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue([{ Icon: 'fa fa-wifi' }, { Icon: 'fa fa-car' }, { Icon: 'fa fa-calendar-o' }])
    AmenitiesList: { Icon: string }[] = [];
}
