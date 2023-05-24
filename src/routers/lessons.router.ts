import { Router } from "express";
import { createLesson, clearLessons, showLessons, editLesson, showLesson } from "../controllers/lessons.controller";

const lessonsRouter: Router = Router();

lessonsRouter
    .get('/', showLessons)
    .get('/:id', showLesson)
    .post('/courses/:courseId', createLesson)
    .patch('/:id', editLesson)
    .delete('/:id', clearLessons)

export default lessonsRouter;