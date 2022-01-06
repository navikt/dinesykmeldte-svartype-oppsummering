/* eslint-disable @typescript-eslint/no-var-requires */
const pino = require('pino');

const logger = (defaultConfig) =>
    pino({
        ...defaultConfig,
        transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
        timestamp: false,
        formatters: {
            level: (label) => {
                return { level: label };
            },
        },
    });

module.exports = {
    logger,
};
