import { Router } from "express";
import { createCourse, deleteCourses, showCourse, showCourses } from "../controllers/courses.controller";

const coursesRouter: Router = Router();

coursesRouter
    .get('/', showCourses)
    .get('/:id', showCourse)
    .post('/', createCourse)
    .delete('/', deleteCourses)

export default coursesRouter;