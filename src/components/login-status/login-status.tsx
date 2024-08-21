import { PageItem, RestClient, RestSdkTypes } from '@progress/sitefinity-nextjs-sdk/rest-sdk';
import { WidgetContext, WidgetModel } from '@progress/sitefinity-nextjs-sdk';
import { LoginStatusEntity } from './login-status-entity';
import { LoginStatusClient } from './login-status-client';

export const LoginStatus = async (props: WidgetContext<LoginStatusEntity>) => {
    const { model, requestContext } = props;
    const user = await RestClient.getCurrentUser();

    if (!user) {
        return null;
    }

    const culture = requestContext.culture;
    const loginPageUrl = await getPageUrl(model, PageTypes.LoginPage, culture);
    const registrationPageUrl = await getPageUrl(model, PageTypes.RegistrationPage, culture);

    return (
        <LoginStatusClient
            {...{
                model,
                user,
                loginPageUrl,
                registrationPageUrl,
            }}
        />
    );
};

const getPageUrl = async (model: WidgetModel<LoginStatusEntity>, pageType: PageTypes, culture: string) => {
    let pageUrl = '';
    let id = '';
    let provider = '';

    const itemIdsOrdered = model.Properties[pageType]?.ItemIdsOrdered;
    if (itemIdsOrdered) {
        [id] = itemIdsOrdered;
    } else {
        return pageUrl;
    }

    const variations = model.Properties[pageType]?.Content[0].Variations;
    if (variations) {
        provider = variations[0].Source;
    }

    let page: PageItem | null = null;
    try {
        page = await RestClient.getItem<PageItem>({
            type: RestSdkTypes.Pages,
            id,
            provider,
            culture,
        });
    } catch (error) {
        console.error(error);
    }

    return page?.ViewUrl || pageUrl;
};

enum PageTypes {
    LoginPage = 'LoginPage',
    RegistrationPage = 'RegistrationPage',
}
