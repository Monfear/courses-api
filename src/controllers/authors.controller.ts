import { Request, RequestHandler, Response } from "express";
import { Author } from "../models/author.model";
import { IAuthor } from "../types/Author.interface";
import { DeleteResult, UpdateResult } from "typeorm";
import { dataSource } from "../db/orm";

// @ GET ALL
export const showAuthors: RequestHandler = async (req: Request, res: Response) => {
    try {
        const authors: Author[] = await Author
            .getRepository()
            .createQueryBuilder('author')
            .orderBy('author.id', 'ASC')
            .getMany();

        if (authors.length < 1) {
            return res.status(200).json({
                success: true,
                msg: 'No authors in database.'
            });
        };

        return res.status(200).json({
            success: true,
            numOfRecords: authors.length,
            data: authors
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                errMsg: error.message,
            });
        };
    };
};

// @ GET SINGLE
export const showAuthor: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);

        const author: Author | null = await Author.findOneBy({ id });

        if (!author) {
            return res.status(404).json({
                success: false,
                msg: 'Author doesn\'t exist.'
            });
        };

        return res.status(200).json({
            success: true,
            data: author
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                errMsg: error.message
            });
        };
    };
};

// * POST
export const createAuthor: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email }: IAuthor = req.body as IAuthor;

        const trackedAuthor: Author | null = await Author.findOneBy({ email });

        if (trackedAuthor) {
            return res.status(409).json({
                success: false,
                msg: 'Author with provided e-mail already exists.'
            });
        };

        const author: Author = Author.create({
            firstName,
            lastName,
            email
        });

        await author.save();

        return res.status(200).json({
            success: true,
            msg: 'Author has been created.',
            data: author
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                errMsg: error.message,
            });
        };
    };
};

// ? PATCH
export const editAuthor: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);

        const author: Author | null = await Author.findOneBy({ id });

        if (!author) {
            return res.status(404).json({
                success: false,
                msg: 'Author doesn\'t exist.',
                info: {
                    affected: 0,
                },
            });
        };

        const modificationData: Partial<Author> = req.body as Partial<Author>;

        const result: UpdateResult = await dataSource
            .getRepository(Author)
            .createQueryBuilder()
            .update(Author)
            .set(modificationData)
            .where('id = :id', { id })
            .execute();

        return res.status(200).json({
            success: true,
            message: 'Author updated.',
            updatedData: modificationData,
            info: result
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                errMsg: error.message
            });
        };
    };
};

// ! DELETE
export const deleteAuthor: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);

        const author: Author | null = await Author.findOneBy({ id });

        if (!author) {
            return res.status(404).json({
                success: false,
                msg: 'Author doesn\'t exist',
                info: {
                    affected: 0,
                },
            });
        };

        const result: DeleteResult = await Author.delete({ id });

        return res.status(200).json({
            success: true,
            msg: 'Author deleted.',
            info: result
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                errMsg: error.message
            });
        };
    };
};