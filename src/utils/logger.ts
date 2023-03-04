import winston from 'winston';
import { Level } from "../types/Level.type";

export class Logger {
    private logger: winston.Logger;

    constructor(private level: Level) {
        this.create();
        this.checkMode();
    };

    get _logger (): winston.Logger {
        return this.logger;
    };

    private create(): void {
        this.logger = winston.createLogger({
            level: this.level,
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
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV !== 'PRODUCTION') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        };
    };
};