import express from 'express';
import { publicRouter, apiRouter } from '../route/api.js';
import exception from '../middleware/exception.js';

const web = express();

web.use(express.json());
web.use(express.urlencoded({ extended: true }));

web.use(publicRouter);
web.use(apiRouter);
web.use(exception);

export { web };