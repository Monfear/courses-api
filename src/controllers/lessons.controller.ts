import { Request, Response, RequestHandler } from "express";
import { Lesson } from "../models/lesson.model";
import { Course } from "../models/course.model";
import { DeleteResult, UpdateResult } from "typeorm";
import { dataSource } from "../db/orm";
import { ILesson } from "../types/Lesson.interface";

// @ GET ALL
export const showLessons: RequestHandler = async (req: Request, res: Response) => {
    try {
        const pageSize: number = Number(req.query.pageSize);
        const pageNumber: number = Number(req.query.pageNumber);

        const lessons: Lesson[] = await dataSource
            .getRepository(Lesson)
            .createQueryBuilder('lesson')
            .orderBy('lesson.id', 'ASC')
            .limit(pageSize || 0)
            .offset(pageSize * (pageNumber - 1) || 0)
            .getMany();

        if (lessons.length < 1) {
            return res.status(200).json({
                success: true,
                msg: 'No lessons in database.'
            });
        };

        return res.status(200).json({
            success: true,
            numOfRecords: lessons.length,
            data: lessons,
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
export const showLesson: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);

        const lesson: Lesson | null = await Lesson.findOneBy({
            id
        });

        if (!lesson) {
            return res.status(404).json({
                success: false,
                msg: 'Lesson doesn\'t exist'
            });
        };

        return res.status(200).json({
            success: true,
            data: lesson
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

// * POST
export const createLesson: RequestHandler = async (req: Request, res: Response) => {
    try {
        const courseId: number = parseInt(req.params.courseId);

        const course: Course | null = await Course.findOneBy({
            id: courseId,
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                errMsg: 'Course not found.'
            });
        };

        const { title, duration } = req.body;

        const lesson: Lesson = Lesson.create({
            title,
            duration,
            course,
        });

        await lesson.save();

        return res.status(201).json({
            success: true,
            msg: 'Lesson created.',
            data: lesson,
            connectedWith: course
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
export const editLesson: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);

        const updatedLesson: Partial<ILesson> = req.body;

        const result: UpdateResult = await dataSource
            .createQueryBuilder()
            .update(Lesson)
            .set(updatedLesson)
            .where('id = :lessonId', { lessonId: id })
            .execute();

        return res.status(200).json({
            success: true,
            msg: 'Lesson updated.',
            updatedData: updatedLesson,
            info: result,
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
export const clearLessons: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result: DeleteResult = await Lesson.delete({});

        res.status(200).json({
            success: true,
            msg: result,
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