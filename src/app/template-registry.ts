import { defaultTemplateRegistry, TemplateRegistry } from '@progress/sitefinity-nextjs-sdk';
import { Corporate } from '../page-templates';

let customTemplateRegistry: TemplateRegistry = {
    _CorianderLaneLayout: {
        title: 'Coriander template',
        templateFunction: Corporate,
    },
};

customTemplateRegistry = {
    ...defaultTemplateRegistry,
    ...customTemplateRegistry,
};

export const templateRegistry: TemplateRegistry = customTemplateRegistry;
