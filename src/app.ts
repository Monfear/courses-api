import express, { Express } from "express";
import connectDB from "./db/connection";
import appRouter from './routers/appRouter';
import { LEVELS } from "./types/Levels.enum";
import { configDotenv } from "./utils/dotenv";
import { Logger } from "./utils/logger";
import mysql from 'mysql';

class App {
    private port: number = 3000;
    private hostname: string = 'localhost';
    private app: Express = express();

    private logger: Logger;
    private db: mysql.Connection;

    constructor() {
        configDotenv();

        this.logger = new Logger(LEVELS.INFO);
        this.db = connectDB();

        this.makeQuery('select * from users');
    };

    public init(): void {
        try {
            this.app.listen(this.port, this.hostname, (): void => {
                this.logger._logger.info(`[i] app is listening on ${this.hostname} at port ${this.port}`);
            });

            this.setupRouters();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.warn(error.message);
            };
        };
    };

    private setupRouters(): void {
        this.app.use('/', appRouter);
    };

    private makeQuery(query: string): void {
        this.db.query(query, (error: mysql.MysqlError, result: any) => {
            if (!error) {
                console.log(result);
            } else {
                console.warn(error.sqlMessage);
            };
        });
    };
};

(function runApp(): void {
    new App().init();
})();