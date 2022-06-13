import "dotenv/config";
import app from "./express";

app.listen(3000, (error) => {
	if (error) {
		console.log("Error while starting the server : ", error);
	}
	console.log("Server started at port 3000");
});
