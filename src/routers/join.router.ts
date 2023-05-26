import { Router } from "express";
import { joinAuthorsCourses } from "../controllers/join.controller";

const joinRouter: Router = Router();

joinRouter
    .put('/authors/:authorID/courses/:courseID', joinAuthorsCourses)

export default joinRouter;