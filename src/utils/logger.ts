import winston from 'winston';
import { MODES } from "../types/Modes.enum";

const NODE_ENV = process.env.NODE_ENV;
const LOGGER_LEVEL = process.env.LOGGER_LEVEL;

if (!NODE_ENV) {
    console.warn('[!] No current node env mode in env.');
};

if (!LOGGER_LEVEL) {
    console.warn('[!] No logger level in env.')
};

export class Logger {
    private logger: winston.Logger;

    constructor(private fileName: string) {
        this.create();
        this.checkMode();
    };

    private create(): void {
        this.logger = winston.createLogger({
            level: LOGGER_LEVEL,
            format: winston.format.json({
                space: 4,
            }),
            transports: [
                new winston.transports.File({
                    filename: 'logs/all.log',
                }),
                new winston.transports.File({
                    filename: 'logs/error.log'
                })
            ]
        });
    };

    private checkMode(): void {
        if (!NODE_ENV) {
            console.warn(`[!] No logger mode detected in >> ${this.fileName}.`);
        };

        if (NODE_ENV !== MODES.PRODUCTION) {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        };
    };

    public info(message: string): void {
        this.logger.info(message);
    };

    public debug(message: string): void {
        this.logger.debug(message);
    };

    public error(message: string): void {
        this.logger.error(message);
    };
};