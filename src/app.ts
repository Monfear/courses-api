import express, { Express } from "express";
import router from './routers/router';
import { configDotenv } from "./utils/dotenv";
import { logger } from "./utils/logger";

// @ server
const port: number = 3000;
const hostname: string = 'localhost';
const app: Express = express();

(function init(): void {
    try {
        configDotenv();

        app.listen(port, hostname, (): void => {
            // console.log(`=> app is listening on ${hostname} at port ${port}`);
            logger.info(`=> app is listening on ${hostname} at port ${port}`)
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.warn(error.message);
        };
    };
})();

// ? ************************************
(function test(): void {
    // pass
    // console.log(process.env.LOGGER_LEVEL);
    // console.log(process.env.NODE_ENV)
})();
// ? ************************************

// @ routers
app.use('/', router);