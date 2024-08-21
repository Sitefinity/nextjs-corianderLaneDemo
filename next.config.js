/** @type {import('next').NextConfig} */
const path = require('path');

const cspHeader = `
    script-src https://*.insight.sitefinity.com *.googleapis.com *.gstatic.com www.google.com apis.google.com *.google-analytics.com connect.facebook.net ajax.aspnetcdn.com https://www.youtube.com platform.twitter.com https://syndication.twitter.com/ https://s.ytimg.com https://publish.twitter.com *.twimg.com platform.linkedin.com http://platform.stumbleupon.com/1/widgets.js https://*.googletagmanager.com cdnjs.cloudflare.com 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css *.googleapis.com *.gstatic.com netdna.bootstrapcdn.com kendo.cdn.telerik.com www.google.com platform.twitter.com/css/ *.twimg.com cdnjs.cloudflare.com 'unsafe-inline';
    img-src 'self' https://tile.openstreetmap.org *.gstatic.com *.googleapis.com platform.tumblr.com web.facebook.com www.facebook.com www.redditstatic.com www.linkedin.com i.ytimg.com https://syndication.twitter.com https://static.licdn.com/scds/common/u/images/apps/connect/sprites/sprite_connect_v14.png pbs.twimg.com platform.twitter.com/css/ *.twimg.com data: blob: https://*.googletagmanager.com;
    connect-src https://*.insight.sitefinity.com https://*.dec.sitefinity.com 'self';
    font-src 'self' fonts.gstatic.com kendo.cdn.telerik.com netdna.bootstrapcdn.com data: cdnjs.cloudflare.com https://stackpath.bootstrapcdn.com;
    media-src 'self' data: blob:;
    frame-src 'self' https://www.youtube.com;
    default-src 'self'`;

module.exports = {
    webpack: (config, options) => {
        config.resolve['alias']['@widgetregistry'] = path.resolve(__dirname, 'src/app/widget-registry');
        return config;
    },
    skipTrailingSlashRedirect: true,
    output: process.env.SF_BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
    experimental: {
        proxyTimeout: 60000,
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'src', 'style')],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeader.replace(/\n/g, ''),
                    },
                ],
            },
        ];
    },
};
