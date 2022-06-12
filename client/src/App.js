import { ThemeProvider } from "@mui/material";
import Home from "./pages/Home";
import RenderModel from "./RenderModel";
import { theme } from "./theme";

function App() {
	return (
		// <ThemeProvider theme={theme}>
		// 	<Home />
		// </ThemeProvider>
		<RenderModel />
	);
}

export default App;
