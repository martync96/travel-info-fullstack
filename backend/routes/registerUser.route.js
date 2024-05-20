import express from 'express';
import { registerUserController } from '../controllers/registerUser.controller.js';

const router = express.Router();

router.route("/").post(registerUserController);

export { router as registerUser };