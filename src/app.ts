import express, { Express } from "express";
import router from './routers/router';
import { configDotenv } from "./utils/dotenv";
import { logger } from "./utils/logger";
// import { logger } from "./utils/logger";

class App {
    private port: number = 3000;
    private hostname: string = 'localhost';
    private app: Express = express();

    constructor() {
        configDotenv();
    };

    public init(): void {
        try {
            this.app.listen(this.port, this.hostname, (): void => {
                logger.info(`app is listening on ${this.hostname} at port ${this.port}`);
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