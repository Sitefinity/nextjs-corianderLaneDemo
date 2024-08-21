import { combineClassNames } from '@progress/sitefinity-nextjs-sdk';
import { ClassificationToken } from '@interfaces';
import { sanitizeTemplateValue } from '../../../utils';
import Link from 'next/link';

export const ListTaxonCloud = ({ items, attributes = {}, showItemCount }: TaxaProps) => (
    <ul {...attributes}>
        {items.map((token: ClassificationToken) => {
            const { count, cloudSizeClass } = getTaxaConfig(token, showItemCount);
            return (
                <li className='list-unstyled list-inline-item '>
                    <Link className={combineClassNames('text-decoration-none ', cloudSizeClass)} href={token.UrlName}>
                        {sanitizeTemplateValue(token.Title)}
                    </Link>
                    {count}
                    {token.SubTaxa &&
                        token.SubTaxa.map((taxa, index) => (
                            <ListTaxonCloud key={index} items={taxa.SubTaxa} showItemCount={showItemCount} />
                        ))}
                </li>
            );
        })}
    </ul>
);

const getTaxaConfig = (token: ClassificationToken, showItemCount: boolean) => {
    return {
        count: showItemCount ? `(${token.AppliedTo})` : '',
        cloudSizeClass: 'fs-' + (6 - Math.floor(token.AppliedTo / 2)),
    };
};

interface TaxaProps {
    items: ClassificationToken[];
    attributes?: { [key: string]: any };
    showItemCount: boolean;
}
