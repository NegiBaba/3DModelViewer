import { s3 } from "../aws";
import fs from "fs";

const fetchAllModels = (req, res) => {
	try {
		const params = {
			Bucket: process.env.S3_BUCKET,
		};

		s3.listObjects(params, (error, data) => {
			if (error) {
				console.log(error);
				res.sendStatus(404);
			} else {
				res.send(data);
			}
		});
	} catch (error) {
		console.log(error);
		res.sendStatus(200);
	}
};

const fetchModel = (req, res) => {
	const { name } = req.params;
	res.json({ url: `https://negibaba.s3.ap-south-1.amazonaws.com/${name}` });
};

const putModel = (req, res) => {
	const fileContent = fs.readFileSync(req.file.path);
	const params = {
		Body: fileContent,
		Bucket: process.env.S3_BUCKET,
		Key: req.file.originalname,
	};
	s3.putObject(params, (error, data) => {
		if (error) {
			console.log(error);
			res.sendStatus(404);
		} else {
			res.sendStatus(200);
		}
	});
};

export default { fetchAllModels, fetchModel, putModel };
