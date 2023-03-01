import { Request, Response, RequestHandler } from "express";

export const home_get: RequestHandler = (req: Request, res: Response): void => {
    res.status(200).send('<h1>home</h1>');
};

export const notFound_get: RequestHandler = (req: Request, res: Response): void => {
    res.status(404).send('<h1>not found</h1>');
};