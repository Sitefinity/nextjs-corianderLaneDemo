export const TAXON_ID = {
    INGREDIENTS: {
        label: 'ingredients',
        id: '93f98f90-b214-4f22-956f-431569101395',
    },
    JOB_DIVISIONS: {
        label: 'jobdivisions',
        id: 'd7372968-8fd9-422f-b4b0-20629c3944e5',
    },
} as const;

export const MAP_ICON_SETTINGS = {
    iconUrl: '/images/default-source/default-album/coriander-mobile-logo.png',
    iconSize: [45, 45],
    iconAnchor: [24, 46],
} as const;

export enum WidgetAreas {
    HEADER = 'Header',
    CONTENT = 'Content',
    FOOTER = 'Footer',
}
