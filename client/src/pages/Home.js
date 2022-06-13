import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import communityBg from "../images/community-bg.png";

import NavBar from "../components/NavBar";
import List from "../components/List";

const Home = () => {
	let fileInput = useRef();
	const fileTypeRegex = /^.*\.(gltf|glb|ftx)$/;
	const [files, setFiles] = useState([]);

	const uploadModelFile = (event) => {
		event.preventDefault();
		const file = fileInput.current.files[0];
		const fileName = file.name;

		if (!fileTypeRegex.test(fileName)) {
			alert(
				"You are trying to upload an Invalid file type, Please upload a valid 3D model file."
			);
		} else {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("fileName", fileName);

			axios
				.post("http://localhost:3000/api/models", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					fetchModelsList();
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const fetchModelsList = () => {
		axios
			.get("http://localhost:3000/api/models")
			.then((res) => {
				setFiles(res.data.Contents);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchModelsList();
	}, []);

	return (
		<Box
			sx={{
				flexGrow: 1,
				height: "100vh",
				bgcolor: "#121212",
				color: "#ffffff",
			}}
		>
			<NavBar />
			<Grid
				container
				sx={{
					pl: { xs: 0, md: "230px" },
					pt: { xs: "60px", md: 0 },
				}}
			>
				<Container>
					<Grid
						container
						sx={{
							p: 6,
							display: "flex",
							alignItems: "center",
							flexDirection: "column",
							backgroundSize: "cover",
							backgroundImage: `url(${communityBg})`,
						}}
					>
						<Typography variant="h3">Community</Typography>
						<Typography variant="h6">Ideas of the open world</Typography>
					</Grid>
					<Grid
						container
						sx={{
							m: 1,
							px: 3,
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<form onSubmit={uploadModelFile} method="post">
							<input
								type="file"
								name="files"
								ref={fileInput}
								placeholder="Upload your own files..."
							/>
							<button type="submit">Upload File</button>
						</form>
					</Grid>
					<Grid container>
						<List files={files} />
					</Grid>
				</Container>
			</Grid>
		</Box>
	);
};

export default Home;
