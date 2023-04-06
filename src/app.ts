import express, { Express } from "express";
import connectDB from "./db/connection";
import appRouter from './routers/appRouter';
import { LEVELS } from "./types/Levels.enum";
import { configDotenv } from "./utils/dotenv";
import { Logger } from "./utils/logger";
import { Connection } from 'mysql';
import { queries } from "./db/queries";

class App {
    private port: number = 3000;
    private hostname: string = 'localhost';
    private app: Express = express();

    private logger: Logger;
    protected db: Connection;

    constructor() {
        configDotenv();

        this.logger = new Logger(LEVELS.INFO);
        this.db = connectDB();

        queries.makeQuery(this.db, 'select * from users');
    };

    public init(): void {
        try {
            this.app.listen(this.port, this.hostname, (): void => {
                this.logger.info(`[i] app is listening on ${this.hostname} at port ${this.port}`);
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

    // @ ** in progress **

};

(function runApp(): void {
    new App().init();
})();