import { combineClassNames } from '@progress/sitefinity-nextjs-sdk';

export const Amenities = ({
    amenities,
    wrapperClassName = '',
    amenitiesListLabel,
    amenitiesIconList,
}: {
    amenities: string | null;
    wrapperClassName?: string;
    amenitiesListLabel: string | null;
    amenitiesIconList: { Icon: string }[] | null;
}) => {
    const getAmenitiesArray = (value: string | null): string[] => {
        const padSymbol = '0';
        const maxLength = 3;
        const numberValue = Number(value);
        let binaryValue = padSymbol.repeat(maxLength);
        if (!Number.isNaN(numberValue)) {
            binaryValue = numberValue.toString(2).padStart(maxLength, padSymbol);
        }

        return binaryValue.split('').reverse();
    };

    const amenitiesArray = getAmenitiesArray(amenities);

    if (!amenitiesListLabel || !amenitiesIconList) {
        return null;
    }

    return amenitiesArray.map((a, index) => {
        if (a !== '1') {
            return null;
        }

        return (
            <div {...(wrapperClassName ? { className: wrapperClassName } : {})} key={index}>
                <i className={combineClassNames(amenitiesIconList[index].Icon, 'me-1')} aria-hidden='true'></i>
                <span>{amenitiesListLabel.split(',')[index].trim()}</span>
            </div>
        );
    });
};
