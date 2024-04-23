import express from 'express';
import { changePasswordController } from '../controllers/changePassword.controller.js';

const router = express.Router();

router.route("/").post(changePasswordController);

export { router as changePassword };