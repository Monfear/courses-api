import { Router } from 'express';
import { index_get, notFound_get } from "../controllers/controller";

const router: Router = Router();

router.route('/')
    .get(index_get);

router.route('*')
    .get(notFound_get);

export default router;