import 'reflect-metadata';
import express, { Express } from "express";
import { configDotenv } from "./utils/dotenv";
import { Connection } from 'mysql';
import connectOrm from "./db/orm";
import { Logger } from "./utils/logger";
import { LEVELS } from "./types/Levels.enum";
import appRouter from './routers/appRouter';
import { DataSource } from "typeorm";

class App  {
    private port: number = 3000;
    private hostname: string = 'localhost';
    private app: Express = express();

    protected mysqlConnection: Connection;
    protected dataSource: DataSource;
    private logger: Logger;

    // @ ** in progress properties **

    // @ **

    constructor() {
        this.assambleUtils();
        this.assembleDB();
    };

    private assambleUtils(): void {
        // configDotenv();
        this.logger = new Logger(LEVELS.INFO);
    };

    private assembleDB(): void {
        this.dataSource = connectOrm();
    };

    public run(): void {
        try {
            this.app.listen(this.port, this.hostname, (): void => {
                this.logger.info(`[i] app is listening on ${this.hostname} at port ${this.port}`);
            });

            this.arrangeMiddlewares();
            this.arrangeRouters();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.warn(`[-] ${error.message}`);
            };
        };
    };

    private arrangeRouters(): void {
        this.app.use('/api', appRouter);
    };

    private arrangeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    // @ ** in progress methods **

    // @ **
};

(function startApp(): void {
    new App().run();
})();