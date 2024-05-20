import express from 'express';
import { addFavouriteLocationController } from '../controllers/addFavouriteLocation.controller.js';

const router = express.Router();

router.route("/").post(addFavouriteLocationController);

export { router as addFavouriteLocation };