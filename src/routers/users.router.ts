import { Router } from "express";
import { showAllUsers } from "../controllers/users.controller";

const usersRouter: Router = Router();

usersRouter
    .get('/', showAllUsers)

export default usersRouter;