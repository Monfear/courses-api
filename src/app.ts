import 'reflect-metadata';
import express, { Express } from "express";
import cors from 'cors';
import connectOrm from "./db/orm";
import { Logger } from "./utils/logger";
import { LEVELS } from "./types/Levels.enum";
import coursesRouter from "./routers/courses.router";
import lessonsRouter from "./routers/lessons.router";
import { showRequestInfo } from "./middlewares/showRequestInfo";
import usersRouter from "./routers/users.router";

class App  {
    private port: number = 3000;
    private hostname: string = 'localhost';
    private app: Express = express();

    private logger: Logger;

    // @ ** in progress properties **

    // @ **

    constructor() {
        this.assambleUtils();
        this.assembleDB();
    };

    private assambleUtils(): void {
        this.logger = new Logger(LEVELS.INFO);
    };

    private assembleDB(): void {
        connectOrm();
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
                console.warn(`[!] ${error.message}`);
            };
        };
    };

    private arrangeRouters(): void {
        this.app.use('/api/courses', coursesRouter);
        this.app.use('/api/lessons', lessonsRouter);
        this.app.use('/api/users', usersRouter);
    };

    private arrangeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({
            origin: true,
        }));
        this.app.use(showRequestInfo);
    }

    // @ ** in progress methods **

    // @ **
};

(function startApp(): void {
    new App().run();
})();