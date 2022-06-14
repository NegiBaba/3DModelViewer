import app from "./express";

app.listen(process.env.PORT || 3000, (error) => {
	if (error) {
		console.log("Error while starting the server : ", error);
	}
	console.log("Server started at port ", process.env.PORT);
});
