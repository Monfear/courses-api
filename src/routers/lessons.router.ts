import { Router } from "express";
import { createLesson, clearLessons, showLessons, editLesson } from "../controllers/lessons.controller";

const lessonsRouter: Router = Router();

lessonsRouter
    .get('/', showLessons)
    .post('/courses/:courseId', createLesson)
    .patch('/:id', editLesson)
    .delete('/', clearLessons)

export default lessonsRouter;