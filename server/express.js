import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";

import modelRoutes from "./routes/models.routes";

const upload = multer({ dest: "uploads/" });
const app = express();

app.use(upload.single("file"));
app.use(cors());

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

app.use("/", modelRoutes);

export default app;
