import { LanguageSelectorEntity, LanguageSelectorViewProps } from '@progress/sitefinity-nextjs-sdk/widgets';
import { LanguageSelectorClient } from './language-selector-client';

export const LanguageSelectorServer = async (props: LanguageSelectorViewProps<LanguageSelectorEntity>) => (
    <LanguageSelectorClient {...props} />
);
