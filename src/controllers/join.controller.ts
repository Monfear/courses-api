import { Request, RequestHandler, Response } from "express";
import { Author } from "../models/author.model";
import { Course } from "../models/course.model";

// @ AUTHORS AND COURSES
export const joinAuthorsCourses: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { authorID, courseID } = req.params;

        const author: Author | null = await Author.findOneBy({ id: parseInt(authorID) });

        if (!author) {
            return res.status(404).json({
                success: false,
                msg: 'Author not found.'
            });
        };

        const course: Course | null = await Course.findOneBy({ id: parseInt(courseID) });

        if (!course) {
            return res.status(404).json({
                success: false,
                msg: 'Course not found.'
            });
        };

        author.courses = [course];

        await author.save();

        return res.status(200).json({
            success: true,
            msg: `Entities has been joined.`,
            data: {
                author,
                course
            },
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