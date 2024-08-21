export const guid = (): string => {
    let id: string = '';
    let i: number;
    let random: number;

    for (i = 0; i < 32; i++) {
        random = (Math.random() * 16) | 0;

        if (i === 8 || i === 12 || i === 16 || i === 20) {
            id += '-';
        }
        id += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
    }

    return id;
};

export const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';

export const getUniqueId = (name?: string): string => {
    if (!name) {
        return guid();
    }
    return `${name}-${guid().substring(0, 4)}`;
};
