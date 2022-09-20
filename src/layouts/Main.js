import React from "react";
import Sidebar from "../components/Sidebar";
import Body from "../components/Body";
import Dashboard from "./Dashboard";
import styled from "styled-components";
import AddMeeting from "./AddMeeting"

import { useDataLayerValue } from "../reducer/DataLayer";

function Main() {
	return (
		<>
			<Container>
				<Sidebar />
				{/* <Dashboard /> */}
				<AddMeeting/>
			</Container>
		</>
	);
}

export default Main;

const Container = styled.div`
	display: flex;
	flex-direction: row;
	height: 100vh;
	width: 100%;
`;
