import { Request, Response, RequestHandler } from "express";
import { Course } from "../models/course.model";
import { DeleteResult } from "typeorm";

// @ GET
export const showCourses: RequestHandler = async (req: Request, res: Response) => {
    try {
        const courses: Course[] = await Course.find();

        if (courses.length < 1) {
            return res.status(200).json({
                success: true,
                msg: 'No courses in database.'
            });
        };

        return res.status(200).json({
            success: true,
            numOfRecords: courses.length,
            data: courses,
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
            success: true,
            msg: 'Course created',
            data: course,
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
export const deleteCourses: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result: DeleteResult = await Course.delete({});

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