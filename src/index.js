import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DataLayer } from "./reducer/DataLayer";
import reducer, { initialState } from "./reducer/reducer";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<DataLayer initialState={initialState} reducer={reducer}>
				<App />
			</DataLayer>
		</BrowserRouter>
	</React.StrictMode>
);
