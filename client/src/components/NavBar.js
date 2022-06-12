import * as React from "react";

import { Box } from "@mui/system";
import { AppBar, Button } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../images/fabrik_full_logo.png";

const NavBar = () => {
	return (
		<AppBar
			position="fixed"
			sx={{
				p: { xs: 2, md: 4 },
				top: 0,
				left: 0,
				width: { xs: "100%", md: "230px" },
				height: { xs: "60px", md: "100vh" },
				bgcolor: "#242424",
				display: { xs: "flex" },
				flexDirection: { xs: "row", md: "column" },
				alignItems: { xs: "center" },
				justifyContent: { xs: "space-between" },
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: { xs: "flex-start", md: "center" },
					alignItems: "center",
				}}
			>
				<img src={Logo} alt="Fabrik logo" width="auto" height="24px" />
			</Box>
			<Box
				sx={{
					pl: 3,
					flexGrow: { md: 1 },
					display: { xs: "none", md: "flex" },
					justifyContent: "center",
					alignItems: "flex-start",
					flexDirection: "column",
				}}
			>
				<Button
					href="#"
					variant="text"
					sx={{
						my: 1,
						color: "#ffffff",
						alignItems: "center",
						textTransform: "none",
					}}
					startIcon={<PersonIcon />}
				>
					Login
				</Button>
				<Button
					href="#"
					variant="text"
					sx={{
						my: 1,
						color: "#ffffff",
						alignItems: "center",
						textTransform: "none",
					}}
					startIcon={<LogoutIcon />}
				>
					Register
				</Button>
			</Box>
			<MenuIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
		</AppBar>
	);
};
export default NavBar;
