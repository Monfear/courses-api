import { Router } from "express";
import { createLesson, clearLessons, showLessons } from "../controllers/lessons.controller";

const lessonsRouter: Router = Router();

lessonsRouter
    .get('/', showLessons)
    .post('/courses/:courseId', createLesson)
    .delete('/', clearLessons)

export default lessonsRouter;