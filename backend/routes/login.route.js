import express from 'express';
import { loginController } from '../controllers/login.controller.js';

const router = express.Router();

router.route("/").post(loginController);

export { router as login };