import { Router } from "express";
import { blogController } from "./controllers/blogController.js";
import { userController } from "./controllers/userController.js";

export const routes = Router();

routes.use(blogController);
routes.use(userController);

routes.get('/*splat', (req, res) => {
    res.status(404).render('404', { pageTitle: '404 Page not found' });
});