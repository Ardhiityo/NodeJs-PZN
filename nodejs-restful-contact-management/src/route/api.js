import express from "express";
import userController from '../controller/user-controller.js';
import auth from "../middleware/auth.js";
import contactController from "../controller/contact-controller.js";

const publicRouter = new express.Router();
publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/users/login', userController.login);

const apiRouter = new express.Router();
apiRouter.use(auth);
apiRouter.delete('/api/users/logout', userController.logout);
apiRouter.patch('/api/users/current', userController.update);
apiRouter.get('/api/users/current', userController.current);
apiRouter.post('/api/contacts', contactController.create);
apiRouter.get('/api/contacts', contactController.get);
apiRouter.get('/api/contacts/:id', contactController.detail);
apiRouter.put('/api/contacts/:id', contactController.update);
apiRouter.delete('/api/contacts/:id', contactController.destroy);

export {
    publicRouter,
    apiRouter
};