import React from 'react';
import { CorianderBreadcrumbTemplate } from './coriander-breadcrumb-template';
import { BreadcrumbItem } from '@progress/sitefinity-nextjs-sdk/rest-sdk';

export const CorianderBreadcrumb = (props: { items: BreadcrumbItem[]; attributes: { [key: string]: any } }) => (
    <CorianderBreadcrumbTemplate {...props} />
);
