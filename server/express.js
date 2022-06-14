import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";

import modelRoutes from "./routes/models.routes";

const upload = multer({ dest: "uploads/" });
const app = express();

app.use(upload.single("file"));
app.use(cors());

app.use(express.static("client/build"));

app.use("/", modelRoutes);
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

export default app;
