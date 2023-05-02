import { Router } from "express";
import { createCourse, deleteCourses, showCourse, showCourses } from "../controllers/courses.controller";

const coursesRouter: Router = Router();

coursesRouter
    .get('/courses', showCourses)
    .get('/course/:id', showCourse)
    .post('/courses', createCourse)
    .delete('/courses', deleteCourses)

export default coursesRouter;