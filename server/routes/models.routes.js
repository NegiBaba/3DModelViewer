import express from "express";
import modelController from "../controllers/models.controller";

const router = express.Router();

router
	.route("/api/models")
	.get(modelController.fetchAllModels)
	.post(modelController.putModel);

router.route("/api/models/:name").get(modelController.fetchModel);

export default router;
