import { Router } from "express";
import { createLesson, deleteLessons, showLessons } from "../controllers/lessons.controller";

const lessonsRouter: Router = Router();

lessonsRouter
    .get('/', showLessons)
    .post('/courses/:courseId', createLesson)
    .delete('/', deleteLessons)

export default lessonsRouter;