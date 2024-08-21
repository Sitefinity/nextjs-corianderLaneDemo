import { WidgetExecutionError } from '@progress/sitefinity-nextjs-sdk';
import { widgetRegistry } from '../widget-registry';
import { initRendering, RenderWidget } from '@progress/sitefinity-nextjs-sdk/pages';

export default async function Render({ searchParams }: { searchParams: { [key: string]: string } }) {
    await initRendering(widgetRegistry, WidgetExecutionError);
    return RenderWidget({ searchParams });
}
