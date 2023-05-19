import { Router } from "express";
import { createUser, deleteUser, editUser, showAllUsers, showSingleUser } from "../controllers/users.controller";

const usersRouter: Router = Router();

usersRouter
    .get('/', showAllUsers)
    .get('/:id', showSingleUser)
    .post('/', createUser)
    .patch('/:id', editUser)
    .delete('/:id', deleteUser)

export default usersRouter;