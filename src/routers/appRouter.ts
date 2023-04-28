import { Router } from 'express';
import { createCourse, createLesson, showCourses } from "../controllers/appController";


const appRouter: Router = Router();

// @ create course
appRouter.post('/course', createCourse);

// @ create lesson connected with course
appRouter.post('/course/:courseId/lesson', createLesson)

// @ show courses
appRouter.get('/courses', showCourses);

export default appRouter;