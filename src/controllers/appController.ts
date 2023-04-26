import { Request, Response, RequestHandler } from "express";
import { Lesson } from "../models/lesson.model";
import { Course } from "../models/course.model";

export const createCourse: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { title, description, category, level, price } = req.body;

        const course: Course = Course.create({
            title,
            description,
            category,
            level,
            price
        });

        await course.save();

        return res.status(201).json({
            msg: 'Course created',
            data: course,
        });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                errMsg: error.message
            });
        };
    };
};

export const createLesson: RequestHandler = async (req: Request, res: Response) => {
    try {
        const courseId: number = parseInt(req.params.courseId);

        const course: Course | null = await Course.findOneBy({
            id: courseId,
        });

        if (!course) {
            return res.status(404).json({
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
            msg: 'Lesson created.',
            data: lesson,
            connectedWith: course
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                errMsg: error.message,
            });
        };
    };
};