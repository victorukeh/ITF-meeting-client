import "./App.css";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import { useEffect } from "react";
import { Notification } from "./components/Notification";
import { useDataLayerValue } from "./reducer/DataLayer";
function App() {
	const [{ token, user, snackbar }, dispatch] = useDataLayerValue();
	useEffect(() => {
		window.localStorage.setItem("token", JSON.stringify(token));
		window.localStorage.setItem("user", JSON.stringify(user));
	}, [token]);
	const { vertical, horizontal, open, notification } = snackbar;
	const handleClose = () => {
		dispatch({
			type: "SET_SNACKBAR",
			snackbar: { ...snackbar, open: false },
		});
	};
	// useEffect(() => {
	// 	const data = window.localStorage.getItem("MY_TOKEN");
	// 	if (data !== null) dispatch({ type: "SET_TOKEN", token: JSON.parse(data) });
	// 	console.log(data)
	// }, []);
	return (
		<div className="App">
			{!token && <Login />}
			{token && <Main />}
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
