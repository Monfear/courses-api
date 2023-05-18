import { Router } from "express";
import { createUser, editUser, showAllUsers, showSingleUser } from "../controllers/users.controller";

const usersRouter: Router = Router();

usersRouter
    .get('/', showAllUsers)
    .get('/:id', showSingleUser)
    .post('/', createUser)
    .patch('/:id', editUser)

export default usersRouter;