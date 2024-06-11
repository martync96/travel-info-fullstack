import express from 'express';
import { removeFavouriteLocationController } from '../controllers/removeFavouriteLocation.controller.js';

const router = express.Router();

router.route("/").delete(removeFavouriteLocationController);

export { router as removeFavouriteLocation }