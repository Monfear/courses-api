import express, { Express } from "express";
import router from './routers/router';
import { configDotenv } from "./utils/utils";

// @ server
const port: number = 3000;
const hostname: string = 'localhost';
const app: Express = express();

(function init(): void {
    try {
        configDotenv();

        app.listen(port, hostname, (): void => {
            console.log(`app is listening on ${hostname} at port ${port}`);
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.warn(error.message);
        };
    };
})();

(function test(): void {
    // console.log(process.argv);
    console.log(process.env.TEST);
})();

// @ routers
app.use('/', router);