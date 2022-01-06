/* eslint-disable @typescript-eslint/no-var-requires */
import pino from 'pino';

const getFrontendLogger = (): pino.Logger =>
    pino({
        browser: {
            transmit: {
                send: async (level, logEvent) => {
                    try {
                        await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/api/logger`, {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(logEvent),
                        });
                    } catch (e) {
                        console.warn(e);
                        console.warn('Unable to log to backend', logEvent);
                    }
                },
            },
        },
    });

const createBackendLogger = require('../../next-logger.config').logger;

export const logger = typeof window !== 'undefined' ? getFrontendLogger() : createBackendLogger();
