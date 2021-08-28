import express from "express";
import { getJoin, postJoin, getLogin, postLogin, about } from "../controllers/userController"
import { home, search } from "../controllers/videoController"
import { publicOnlyMiddleware, avatarUpload } from "../middlewares"

const rootRouter = express.Router();

rootRouter.get('/', home);
rootRouter.route('/join').all(publicOnlyMiddleware).get(getJoin).post(avatarUpload.single("avatar"), postJoin);
rootRouter.route('/login').all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get('/search', search);
rootRouter.get('/about', about);

export default rootRouter;