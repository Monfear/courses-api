import { Request, Response, RequestHandler } from "express";
import { Lesson } from "../models/lesson.model";
import { Course } from "../models/course.model";
import { DeleteResult } from "typeorm";
import { dataSource } from "../db/orm";

// @ GET
export const showLessons: RequestHandler = async (req: Request, res: Response) => {
    try {
        // const lessons: Lesson[] = await Lesson.find();

        const lessons: Lesson[] = await dataSource
            .getRepository(Lesson)
            .createQueryBuilder('lessons')
            .orderBy('lessons.id', 'ASC')
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

// ! DELETE
export const deleteLessons: RequestHandler = async (req: Request, res: Response) => {
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