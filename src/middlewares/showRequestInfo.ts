import { Request, Response, NextFunction } from "express";

export function showRequestInfo(req: Request, res: Response, next: NextFunction): void {

    console.log(`
        ** NEW REQUEST **
        host: ${req.hostname}
        path: ${req.path}
        method: ${req.method}
        **************************
    `);

    next();
};