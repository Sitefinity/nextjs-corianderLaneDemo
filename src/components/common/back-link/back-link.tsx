import React from 'react';
import { sanitizeTemplateValue } from '@utils';
import Link from 'next/link';

export const BackLink = ({ href, label, className = '' }: { href: string; label: string; className?: string }) => (
    <Link {...(className ? { className } : {})} href={href}>
        &lt;&lt; {sanitizeTemplateValue(label)}
    </Link>
);
