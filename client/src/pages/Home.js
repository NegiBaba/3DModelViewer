import axios from "axios";
import { useEffect, useRef, useState } from "react";

import NavBar from "../components/NavBar";
import List from "../components/List";

import "./Home.css";

const Home = () => {
	let fileInput = useRef();
	const [files, setFiles] = useState([]);

	const uploadModelFile = (event) => {
		event.preventDefault();
		const file = fileInput.current.files[0];
		const fileName = file.name;
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
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		axios
			.get("http://localhost:3000/api/models")
			.then((res) => {
				console.log(res.data);
				setFiles(res.data.Contents);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="home_container">
			<NavBar />
			<div className="content_container">
				<div className="header">
					<div className="heading">Community</div>
					<div className="sub_heading">Ideas of the open world</div>
				</div>
				<div className="action_bar">
					<div className="form_container">
						<form onSubmit={uploadModelFile} method="post">
							<input
								type="file"
								name="files"
								ref={fileInput}
								placeholder="Upload your own files..."
							/>
							<button type="submit">Upload File</button>
						</form>
					</div>
				</div>
				<div className="content">
					<List files={files} />
				</div>
			</div>
		</div>
	);
};

export default Home;
