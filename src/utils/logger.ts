import winston from 'winston';
import { LEVELS } from "../types/Levels.enum";

export const logger: winston.Logger = winston.createLogger({
    level: LEVELS.TEST,
    format: winston.format.json({
        space: 4,
    }),
    transports: [
        new winston.transports.File({
            filename: 'logs/all.log',
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
        }),
    ],
});

if (process.env.NODE_ENV !== 'PRODUCTION') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
};

// export class Logger {
//     public logger: winston.Logger;

//     constructor(private level: string) {
//         this.create();
//         this.checkMode();
//     }

//     private create(): void {
//         this.logger = winston.createLogger({
//             level: this.level,
//             format: winston.format.json({
//                 space: 4,
//             }),
//             transports: [
//                 new winston.transports.File({
//                     filename: 'logs/all.log',
//                 }),
//                 new winston.transports.File({
//                     filename: 'logs/error.log'
//                 })
//             ]
//         });
//     }

//     private checkMode(): void {
//         if (process.env.NODE_ENV !== 'PRODUCTION') {
//             this.logger.add(new winston.transports.Console({
//                 format: winston.format.simple(),
//             }));
//         };
//     };

//     public testInfo(): void {
//         this.logger.info('teeest')
//     }
// }