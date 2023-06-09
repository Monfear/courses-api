import { Request, Response, RequestHandler } from "express";
import { Course } from "../models/course.model";
import { DeleteResult, UpdateResult } from "typeorm";
import { dataSource } from "../db/orm";
import { Lesson } from "../models/lesson.model";
import { ICourse } from "../types/Course.interface";

// @ GET ALL
export const showCourses: RequestHandler = async (req: Request, res: Response) => {
    try {
        const courses: Course[] = await Course
            .getRepository()
            .createQueryBuilder('course')
            .orderBy('course.id', 'ASC')
            .leftJoinAndSelect('course.lessons', 'lessons')
            .getMany();

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
            });
        };
    };
};

// @ GET SINGLE
export const showCourse: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);

        const course: Course | null = await dataSource
            .getRepository(Course)
            .createQueryBuilder('course')
            .where('course.id = :id', { id })
            .getOne();

        if (!course) {
            return res.status(404).json({
                success: false,
                msg: 'Course does not exist.'
            });
        };

        const lessons: number = await dataSource
            .getRepository(Lesson)
            .createQueryBuilder('lesson')
            .where('lesson.course_id = :course_id', { course_id: course.id })
            .getCount();

        return res.status(200).json({
            success: true,
            query: req.query,
            data: course,
            numberOfLessons: lessons
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
export const createCourse: RequestHandler = async (req: Request, res: Response) => {
    try {
        const modificationData: ICourse = req.body;
        const { title, description, category, level, price } = modificationData;

        const trackedCourse: Course | null = await dataSource
            .getRepository(Course)
            .createQueryBuilder('course')
            .where('course.title = :title', { title })
            .getOne();

        if (trackedCourse) {
            return res.status(409).json({
                success: false,
                msg: 'Course with that title already exists.'
            });
        };

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
            msg: 'Course has been created.',
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

// ? PATCH
export const editCourse: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);

        const course: Course | null = await dataSource
            .getRepository(Course)
            .createQueryBuilder('course')
            .where('course.id = :id', { id })
            .getOne();

        if (!course) {
            return res.status(404).json({
                success: false,
                msg: 'Course doesn\'t exist.',
                info: {
                    affected: 0,
                },
            });
        };

        const modificationData: Partial<ICourse> = req.body;

        const result: UpdateResult = await dataSource
            .createQueryBuilder()
            .update(Course)
            .set(modificationData)
            .where('id = :courseId', { courseId: id })
            .execute();

        return res.status(200).json({
            success: true,
            msg: 'Course updated.',
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
export const deleteCourse: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);

        const course: Course | null = await Course
            .getRepository()
            .createQueryBuilder('course')
            .where('course.id = :id', { id })
            .getOne();

        if (!course) {
            return res.status(404).json({
                success: false,
                msg: 'Course doesn\'t exist.',
                info: {
                    affected: 0,
                },
            });
        };

        const result: DeleteResult = await Course.delete({
            id
        });

        res.status(200).json({
            success: true,
            msg: 'Course deleted.',
            info: result,
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