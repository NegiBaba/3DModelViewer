import { useNavigate } from "react-router-dom";

import { Box } from "@mui/system";
import { Grid } from "@mui/material";

const List = ({ files }) => {
	let navigate = useNavigate();

	const viewFile = (event) => {
		navigate(`/view/${event.currentTarget.dataset.name}`);
	};

	const itemName = (name) => {
		return name.split(".").slice(0, -1).join(".");
	};

	return (
		<Box sx={{ flexGrow: 1, m: 2, p: 2, borderRadius: 1, bgcolor: "#242424" }}>
			<Grid container>
				{files.map((item) => (
					<Grid
						container
						item
						key={item.Key}
						data-name={item.Key}
						onClick={viewFile}
						sx={{
							"p": 2,
							"m": 1,
							"borderRadius": 1,
							"bgcolor": "rgba(255, 255, 255, 0.1)",
							"&:hover": {
								cursor: "pointer",
								bgcolor: "rgba(255, 255, 255, 0.2)",
							},
						}}
					>
						{itemName(item.Key)}
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default List;
