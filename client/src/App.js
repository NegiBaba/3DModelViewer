import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Home from "./pages/Home";
import Model from "./pages/Model";
import { theme } from "./theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/view/:id" element={<Model />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
