import { WidgetRegistry, initRegistry, defaultWidgetRegistry } from '@progress/sitefinity-nextjs-sdk';
import {
    ContentListMasterViewProps,
    LanguageSelector,
    LanguageSelectorEntity,
} from '@progress/sitefinity-nextjs-sdk/widgets';
import { StylingConfig } from '@progress/sitefinity-nextjs-sdk/widgets/styling';
import {
    CorianderHorizontal,
    StaticSectionEntity,
    StaticSection,
    SearchBox,
    ListNews,
    LoginStatus,
    ListSimpleFood,
    ImageCarousel,
    CorianderContentListEntity,
    ListCareers,
    ListExpandable,
    DetailsNews,
    ListAllPosts,
    ListDetailedFood,
    ListLocations,
    DetailsFood,
    DetailsCareers,
    DetailsLocations,
    DetailsPosts,
    DetailsEvents,
    ListTaxonCloud,
    CorianderBreadcrumb,
    LoginStatusEntity,
    LanguageSelectorServer,
} from '@components';

const customWidgetRegistry: WidgetRegistry = {
    widgets: {
        StaticSection: {
            componentType: StaticSection,
            entity: StaticSectionEntity,
            ssr: true,
            editorMetadata: {
                Title: 'Static Section',
                Category: 'Layout & Presets',
            },
        },
        LoginStatus: {
            componentType: LoginStatus,
            entity: LoginStatusEntity,
            ssr: true,
            editorMetadata: {
                Title: 'Login Status',
            },
        },
        // Dummy widget
        SitefinityRecommendations: {
            componentType: () => null,
            entity: StaticSectionEntity,
            ssr: true,
            editorMetadata: {
                Title: 'Dummy widget',
            },
        },
        // TODO We should change the widget in the coriander so that both .net core and next js could use SitefinityLanguageSelector
        LanguageSelector: {
            entity: LanguageSelectorEntity,
            componentType: LanguageSelector,
            editorMetadata: {
                Title: 'Language selector',
                Category: 'Content',
                Section: 'Navigation and search',
                HasQuickEditOperation: true,
                HideEmptyVisual: true,
                IconName: 'language',
            },
            ssr: true,
        },
    },
};

customWidgetRegistry.widgets = {
    ...defaultWidgetRegistry.widgets,
    ...customWidgetRegistry.widgets,
};

addViews(customWidgetRegistry);

(StylingConfig.ButtonClasses as any)['NavLink'] = { Title: 'Nav link', Value: 'whatever-css-class' };
export const widgetRegistry: WidgetRegistry = initRegistry(customWidgetRegistry);

function addViews(customWidgetRegistry: WidgetRegistry): void {
    const templateConfig: { [key: string]: { views: { [key: string]: Function }; entity?: any } } = {
        SitefinityNavigation: {
            views: {
                CorianderHorizontal: CorianderHorizontal,
            },
        },
        SitefinitySearchBox: {
            views: {
                HeaderSearch: SearchBox,
            },
        },
        SitefinityContentList: {
            views: {
                ListNews: ListNews,
                ListSimpleFood: ListSimpleFood,
                ImageCarousel: ImageCarousel,
                ListCareersWithLocation: (props: ContentListMasterViewProps<CorianderContentListEntity>) =>
                    ListCareers({ ...props, showLocation: true }),
                ListCareers: ListCareers,
                ListExpandable: ListExpandable,
                ListAllPosts: ListAllPosts,
                ListDetailedFood: ListDetailedFood,
                ListLocations: ListLocations,
                'Details.NewsWithImage': DetailsNews,
                'Details.Food': DetailsFood,
                'Details.Careers': DetailsCareers,
                'Details.Locations': DetailsLocations,
                'Details.Posts': DetailsPosts,
                'Details.Events': DetailsEvents,
            },
            entity: CorianderContentListEntity,
        },
        SitefinityClassification: {
            views: {
                ListTaxonCloud,
            },
        },
        SitefinityBreadcrumb: {
            views: {
                BreadcrumbWithH1AsLastElement: CorianderBreadcrumb,
            },
        },
        LanguageSelector: {
            views: {
                'Language selector': LanguageSelectorServer,
            },
        },
    };

    for (let widgetKey of Object.keys(templateConfig)) {
        customWidgetRegistry.widgets[widgetKey].views = {
            ...customWidgetRegistry.widgets[widgetKey].views,
            ...templateConfig[widgetKey].views,
        };

        if (templateConfig[widgetKey].entity) {
            customWidgetRegistry.widgets[widgetKey].entity = templateConfig[widgetKey].entity;
        }
    }
}
