import { Router } from "express";
import { createUser, showAllUsers } from "../controllers/users.controller";

const usersRouter: Router = Router();

usersRouter
    .get('/', showAllUsers)
    .post('/', createUser)

export default usersRouter;