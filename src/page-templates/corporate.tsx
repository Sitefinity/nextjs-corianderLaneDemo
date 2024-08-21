import { RequestContext } from '@progress/sitefinity-nextjs-sdk';
import React, { ReactNode } from 'react';
import { SfWatermark, UserConsent } from '../components';
import { removeContentBlockByValue, WidgetAreas } from '../utils';

export const Corporate = ({
    widgets,
    requestContext,
}: {
    widgets: { [key: string]: ReactNode[] };
    requestContext: RequestContext;
}): JSX.Element => {
    removeContentBlockFromDetailsNews(widgets, requestContext);

    const headerBanner = (
        <>
            <SfWatermark />
            {!requestContext.isEdit && <UserConsent />}
        </>
    );

    return (
        <>
            {headerBanner}
            <header style={{ position: 'relative' }} data-sfcontainer={WidgetAreas.HEADER}>
                {widgets[WidgetAreas.HEADER]}
            </header>
            <main data-sfcontainer={WidgetAreas.CONTENT}>{widgets[WidgetAreas.CONTENT]}</main>
            <footer data-sfcontainer={WidgetAreas.FOOTER}>{widgets[WidgetAreas.FOOTER]}</footer>
        </>
    );
};

const removeContentBlockFromDetailsNews = (widgets: { [key: string]: ReactNode[] }, requestContext: RequestContext) => {
    const newsDetailsPageUrl = 'news-and-events/news/';
    if (requestContext.detailItem && requestContext.url.includes(newsDetailsPageUrl)) {
        removeContentBlockByValue((widgets[WidgetAreas.CONTENT][0] as JSX.Element).props.children.props.model, '<h1');
    }
};
