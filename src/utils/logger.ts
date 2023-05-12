import winston from 'winston';
import { Level } from "../types/Level.type";
import { MODES } from "../types/Modes.enum";

export class Logger {
    private logger: winston.Logger;

    constructor() {
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
        console.log(`[i] current mode: ${process.env.NODE_ENV}`);

        if (process.env.NODE_ENV !== MODES.PRODUCTION) {
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
};