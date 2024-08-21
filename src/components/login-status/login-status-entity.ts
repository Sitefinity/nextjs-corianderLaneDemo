import { MixedContentContext } from '@progress/sitefinity-nextjs-sdk';
import {
    Category,
    Content,
    ContentSection,
    ContentSectionTitles,
    DefaultValue,
    DisplayName,
    KnownContentTypes,
    PropertyCategory,
} from '@progress/sitefinity-widget-designers-sdk';

export class LoginStatusEntity {
    @Content({
        Type: KnownContentTypes.Pages,
        AllowMultipleItemsSelection: false,
        DisableInteraction: true,
        ShowSiteSelector: true,
    })
    LoginPage?: MixedContentContext;

    @Content({
        Type: KnownContentTypes.Pages,
        AllowMultipleItemsSelection: false,
        DisableInteraction: true,
        ShowSiteSelector: true,
    })
    RegistrationPage: MixedContentContext | null = null;

    @DisplayName('Logout field label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Logout')
    LogoutLabel: string = '';

    @DisplayName('Login field label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Login')
    LoginLabel: string = '';

    @DisplayName('Register field label')
    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.LabelsAndMessages)
    @DefaultValue('Register')
    RegisterLabel: string = '';
}
