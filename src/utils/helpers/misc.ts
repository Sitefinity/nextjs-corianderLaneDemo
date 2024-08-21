import { SanitizerService } from '@progress/sitefinity-nextjs-sdk';

export const sanitizeTemplateValue = (value: string | number): string => {
    const sanitizerService = SanitizerService.getInstance();
    return sanitizerService.sanitizeHtml('' + value) as string;
};

export const removeContentBlockByValue = (model: any, value: string) => {
    if (!model || !value) {
        return;
    }

    const search = (obj: any, value: string, parent: any[] = []): any => {
        let searchResult = null;

        if (obj && obj.Name === 'SitefinityContentBlock') {
            if (obj.Properties.Content.startsWith(value)) {
                return { parent, obj };
            }
        }

        if (obj && obj.Children && Array.isArray(obj.Children)) {
            for (let index = 0; index < obj.Children.length; index++) {
                const result = search(obj.Children[index], value, obj.Children);
                if (result) {
                    searchResult = result;
                    break;
                }
            }
        }

        return searchResult;
    };
    const config = search(model, value);

    const indexToRemove = config.parent.findIndex((p: { Id: string }) => p.Id === config.obj.Id);
    if (config && indexToRemove !== -1) {
        config.parent.splice(indexToRemove, 1);
    }
};
