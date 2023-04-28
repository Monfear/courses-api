import { Router } from 'express';
import { createCourse, createLesson, deleteCourses, deleteLessons, showCourses, showLessons } from "../controllers/appController";

const appRouter: Router = Router();

// @ show courses
appRouter.get('/courses', showCourses);

// @ show lessons
appRouter.get('/lessons', showLessons);

// @ create course
appRouter.post('/course', createCourse);

// @ create lesson connected with course
appRouter.post('/course/:courseId/lesson', createLesson);

// @ delete courses
appRouter.delete('/courses', deleteCourses);

// @ delete lessons
appRouter.delete('/lessons', deleteLessons);

export default appRouter;