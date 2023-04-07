import express, { Express } from "express";
import connectDB from "./db/connection";
import appRouter from './routers/appRouter';
import { LEVELS } from "./types/Levels.enum";
import { configDotenv } from "./utils/dotenv";
import { Logger } from "./utils/logger";
import { Connection } from 'mysql';
import connectOrm from "./db/orm";

class App  {
    private port: number = 3000;
    private hostname: string = 'localhost';
    private app: Express = express();

    protected db: Connection;
    private logger: Logger;

    // @ ** in progress properties **

    // @ **

    constructor() {
        this.setupUtils();
        this.setupDB();
    };

    private setupUtils(): void {
        configDotenv();
        this.logger = new Logger(LEVELS.INFO);
    };

    private setupDB(): void {
        this.db = connectDB();
        connectOrm();
    };

    public init(): void {
        try {
            this.app.listen(this.port, this.hostname, (): void => {
                this.logger.info(`[i] app is listening on ${this.hostname} at port ${this.port}`);
            });

            this.setupRouters();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.warn(`[-] ${error.message}`);
            };
        };
    };

    private setupRouters(): void {
        this.app.use('/', appRouter);
    };

    // @ ** in progress methods **

    // @ **
};

(function runApp(): void {
    new App().init();
})();