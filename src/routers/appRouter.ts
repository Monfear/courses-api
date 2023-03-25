import { Router } from 'express';
import { home_get, notFound_get } from "../controllers/controller";

const router: Router = Router();

router.route('/')
    .get(home_get);

router.route('*')
    .get(notFound_get);

export default router;