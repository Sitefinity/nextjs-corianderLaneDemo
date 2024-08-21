const dictionaries: { [key: string]: () => Promise<{ [key: string]: string }> } = {
    en: () => import('./dictionaries/nav_en.json').then((module) => module.default),
    es: () => import('./dictionaries/nav_es.json').then((module) => module.default),
};

export const getNavigationDictionaries = async (locale: string) => dictionaries[locale]();
