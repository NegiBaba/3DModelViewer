import NavBar from "../components/NavBar";
import List from "../components/List";

import "./Home.css";

const Home = () => {
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
						<form>
							<input
								type="file"
								name="myfile"
								placeholder="Upload your own files..."
							/>
						</form>
					</div>
				</div>
				<div className="content">
					<List />
				</div>
			</div>
		</div>
	);
};

export default Home;
