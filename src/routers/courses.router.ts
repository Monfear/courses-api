import { Router } from "express";
import { createCourse, clearCourses, editCourse, showCourse, showCourses } from "../controllers/courses.controller";

const coursesRouter: Router = Router();

coursesRouter
    .get('/', showCourses)
    .get('/:id', showCourse)
    .post('/', createCourse)
    .patch('/:id', editCourse)
    .delete('/', clearCourses)

export default coursesRouter;