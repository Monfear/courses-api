import express, { Express } from "express";
import router from './routers/router';

// @ server
const port: number = 3000;
const hostname: string = 'localhost';
const app: Express = express();

(function init(): void {
    try {
        app.listen(port, hostname, (): void => {
            console.log(`app is listening on ${hostname} at port ${port}`);
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.warn(error.message);
        }
    }
})();

// @ routers
app.use('/', router);