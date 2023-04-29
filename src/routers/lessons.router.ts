import { Router } from "express";
import { createLesson, deleteLessons, showLessons } from "../controllers/lessons.controller";

const lessonsRouter: Router = Router();

lessonsRouter
    .get('/lessons', showLessons)
    .post('/lessons/courses/:courseId', createLesson)
    .delete('/lessons', deleteLessons)

export default lessonsRouter;