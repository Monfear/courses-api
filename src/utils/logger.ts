import winston from 'winston';
import { MODES } from "../types/Modes.enum";

const CURRENT_MODE = process.env.NODE_ENV;

if (!CURRENT_MODE) {
    console.warn('No current mode in env.');
};

export class Logger {
    private logger: winston.Logger;

    constructor(private fileName: string) {
        this.create();
        this.checkMode();
    };

    private create(): void {
        this.logger = winston.createLogger({
            level: process.env.LOGGER_LEVEL,
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
        if (!CURRENT_MODE) {
            console.warn(`[!] No logger mode detected in >> ${this.fileName}.`);
        };

        if (CURRENT_MODE !== MODES.PRODUCTION) {
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
    }
};