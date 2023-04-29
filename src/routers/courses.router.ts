import { Router } from "express";
import { createCourse, deleteCourses, showCourses } from "../controllers/courses.controller";

const coursesRouter: Router = Router();

coursesRouter
    .get('/courses', showCourses)
    .post('/courses', createCourse)
    .delete('/courses', deleteCourses)

export default coursesRouter;