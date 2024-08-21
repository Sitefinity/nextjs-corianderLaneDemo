'use client';

import { BreadcrumbItem } from '@progress/sitefinity-nextjs-sdk/rest-sdk';
import { useEffect, useState } from 'react';

export const CorianderBreadcrumbTemplate = ({
    items,
    attributes,
}: {
    items: BreadcrumbItem[];
    attributes: { [key: string]: any };
}) => {
    const [lastItemTitle, setLastItemTitle] = useState('');
    useEffect(() => {
        const heading = document.querySelector('h1');

        if (heading && heading.textContent) {
            setLastItemTitle(heading.textContent);
        }
    }, []);
    return (
        <div {...attributes}>
            <nav aria-label='Full path to the current page'>
                <ol className='breadcrumb'>
                    {items.map((node: { Title: string; ViewUrl: string }, idx: number) => {
                        if (idx === items.length - 1) {
                            return (
                                <li key={idx} className='breadcrumb-item active' aria-current='page'>
                                    {lastItemTitle || node.Title}
                                </li>
                            );
                        }
                        return (
                            <li key={idx} className='breadcrumb-item'>
                                <a href={node.ViewUrl}>{node.Title}</a>
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
};
