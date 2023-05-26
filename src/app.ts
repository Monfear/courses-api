import 'reflect-metadata';
import express, { Express } from "express";
import cors from 'cors';
import connectOrm from "./db/orm";
import { Logger } from "./utils/logger";
import coursesRouter from "./routers/courses.router";
import lessonsRouter from "./routers/lessons.router";
import { showRequestInfo } from "./middlewares/showRequestInfo";
import usersRouter from "./routers/users.router";
import authRouter from "./routers/auth.router";
import { configDotenv } from "./utils/dotenv";
import { validateUser } from "./middlewares/validateUser.middleware";
import authorsRouter from "./routers/authors.router";
import joinRouter from "./routers/join.router";

class App {
    private port: number = 3000;
    private hostname: string = 'localhost';
    private app: Express = express();

    private logger: Logger;

    constructor() {
        configDotenv('app.ts');

        this.assambleUtils();
        this.assembleDB();
    };

    private assambleUtils(): void {
        this.logger = new Logger('app.ts');
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
        this.app.use('/api/auth', authRouter);
        this.app.use('/api/authors', authorsRouter);

        this.app.use('/api/join', joinRouter);
    };

    private arrangeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({
            origin: true,
        }));
        this.app.use(showRequestInfo);

        this.app.use('/api/courses', validateUser);
        this.app.use('/api/authors', validateUser);
        this.app.use('/api/lessons', validateUser);
        this.app.use('/api/users', validateUser);
    };
};

(function startApp(): void {
    new App().run();
})();