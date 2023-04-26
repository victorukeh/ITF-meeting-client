import "./App.css";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import { useEffect } from "react";
import { Notification } from "./components/Notification";
import { useDataLayerValue } from "./reducer/DataLayer";
function App() {
	const [{ user, snackbar }, dispatch] = useDataLayerValue();
	const { vertical, horizontal, open, notification } = snackbar;
	const token = JSON.parse(window.localStorage.getItem("token"));
	console.log('Token:', token) 
	const handleClose = () => {
		dispatch({
			type: "SET_SNACKBAR",
			snackbar: { ...snackbar, open: false },
		});
	};
	return (
		<div className="app">
			{!token ? <Login /> : <Main />}
			<Notification
				vertical={vertical}
				horizontal={horizontal}
				open={open}
				color={snackbar.error ? "red" : "green"}
				handleClose={handleClose}
				message={notification}
			/>
		</div>
	);
}

export default App;
