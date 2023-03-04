import express, { Express } from "express";
import router from './routers/router';
import { LEVELS } from "./types/Levels.enum";
import { configDotenv } from "./utils/dotenv";
import { Logger } from "./utils/logger";

class App {
    private port: number = 3000;
    private hostname: string = 'localhost';
    private app: Express = express();

    private logger: Logger;

    constructor() {
        configDotenv();
        this.logger = new Logger(LEVELS.INFO);
    };

    public init(): void {
        try {
            this.app.listen(this.port, this.hostname, (): void => {
                this.logger._logger.info(`app is listening on ${this.hostname} at port ${this.port}`);
            });

            this.setupRouters();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.warn(error.message);
            };
        };
    };

    private setupRouters(): void {
        this.app.use('/', router);
    };
} 

(function runApp(): void {
    new App().init();
})();