import "./App.css";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import { useEffect } from "react";
import axios from "axios";
import { useDataLayerValue } from "./reducer/DataLayer";
function App() {
	const [{ token, user }, dispatch] = useDataLayerValue();
	useEffect(() => {
		window.localStorage.setItem('token', JSON.stringify(token))
		window.localStorage.setItem('user', JSON.stringify(user));
		console.log(user)
		console.log(token)
	  }, [token]);

	// useEffect(() => {
	// 	const data = window.localStorage.getItem("MY_TOKEN");
	// 	if (data !== null) dispatch({ type: "SET_TOKEN", token: JSON.parse(data) });
	// 	console.log(data)
	// }, []);
	return (
		<div className="App">
			{!token && <Login />}
			{token && <Main />}
		</div>
	);
}

export default App;
