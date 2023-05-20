import { Router } from "express";
import { createCourse, editCourse, showCourse, showCourses, deleteCourse } from "../controllers/courses.controller";

const coursesRouter: Router = Router();

coursesRouter
    .get('/', showCourses)
    .get('/:id', showCourse)
    .post('/', createCourse)
    .patch('/:id', editCourse)
    .delete('/:id', deleteCourse)

export default coursesRouter;