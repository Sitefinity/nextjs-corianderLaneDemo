'use client';

import {
    LanguageEntry,
    LanguageSelectorEntity,
    LanguageSelectorLinkAction,
    LanguageSelectorViewProps,
} from '@progress/sitefinity-nextjs-sdk/widgets';
import { useRouter } from 'next/navigation';
import { ChangeEvent, ReactNode } from 'react';

export const LanguageSelectorClient = ({
    languages = [],
    languageSelectorLinkAction,
}: LanguageSelectorViewProps<LanguageSelectorEntity>) => {
    const router = useRouter();
    const selectedLanguage = languages.find((language: LanguageEntry) => language.Selected)?.PageUrl;

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value !== selectedLanguage) {
            router.push(event.target.value);
        }
    };

    return (
        <select
            className='form-select cl-language-selector -no-bg'
            aria-label='@Model.AriaLabel'
            value={selectedLanguage}
            onChange={handleSelectChange}
        >
            {languages.map((item, index) => {
                const { Name, PageUrl, LocalizedHomePageUrl, IsTranslated } = item;
                if (IsTranslated) {
                    return languageSelectorLink(index, Name, PageUrl);
                }

                if (languageSelectorLinkAction === LanguageSelectorLinkAction.HideLink) {
                    return null;
                }

                return languageSelectorLink(index, Name, LocalizedHomePageUrl);
            })}
        </select>
    );
};

const languageSelectorLink = (index: number, label: string, href: string): ReactNode => (
    <option key={index} value={href}>
        {label}
    </option>
);
