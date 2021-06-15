const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    assetPrefix: process.env.APP_ORIGIN,
    basePath: isProd ? '/syk/dinesykmeldte' : undefined,
    future: {
        webpack5: false,
    },
};
