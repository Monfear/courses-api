import { Router } from 'express';
import { createCourse, createLesson, showCourses, showLessons } from "../controllers/appController";


const appRouter: Router = Router();

// @ create course
appRouter.post('/course', createCourse);

// @ create lesson connected with course
appRouter.post('/course/:courseId/lesson', createLesson)

// @ show courses
appRouter.get('/courses', showCourses);

// @ show lessons
appRouter.get('/lessons', showLessons);

export default appRouter;