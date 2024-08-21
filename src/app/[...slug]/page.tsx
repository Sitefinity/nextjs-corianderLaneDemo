import { Metadata } from 'next';
import { WidgetExecutionError } from '@progress/sitefinity-nextjs-sdk';
import { widgetRegistry } from '../widget-registry';
import { templateRegistry as templates } from '../template-registry';
import { initRendering, pageMetadata, RenderPage } from '@progress/sitefinity-nextjs-sdk/pages';

export async function generateMetadata({ params, searchParams }: any): Promise<Metadata> {
    initRendering(widgetRegistry, WidgetExecutionError);
    return await pageMetadata({ params, searchParams });
}

export default async function Page({ params, searchParams }: any) {
    initRendering(widgetRegistry, WidgetExecutionError);
    return RenderPage({ params, searchParams, templates });
}
