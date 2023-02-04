import express, { Express, Request, Response } from "express";

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

app.get('/', (req: Request, res: Response): void => {
    res.status(200).send('<h1>home</h1>')
});

app.get('/', (req: Request, res: Response): void => {
    res.status(404).send('<h1>not found</h1>');
});