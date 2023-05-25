import { Router } from "express";
import { createAuthor, deleteAuthor, editAuthor, showAuthor, showAuthors } from "../controllers/authors.controller";

const authorsRouter: Router = Router();

authorsRouter
    .get('/', showAuthors)
    .get('/:id', showAuthor)
    .post('/', createAuthor)
    .patch('/:id', editAuthor)
    .delete('/:id', deleteAuthor);

export default authorsRouter;