import React from "react";
import Sidebar from "../components/Sidebar";
import Body from "../components/Body";
import Dashboard from "./Dashboard";
import styled from "styled-components";
import AddMeeting from "./AddMeeting";
import Meeting from "./Meeting";
import Header from "../components/Header";
import {
	Routes,
	Route,
	Link,
	useRouteMatch,
	useParams,
} from "react-router-dom";

import { useDataLayerValue } from "../reducer/DataLayer";

function Main() {
	return (
		<>
			<MainContainer>
				<Sidebar />
				<Container>
					<MainContent>
						<Header />
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/meeting" element={<Meeting />} />
						</Routes>
					</MainContent>
				</Container>
			</MainContainer>
		</>
	);
}

export default Main;

const MainContainer = styled.div`
	display: flex;
	flex-direction: row;
	height: 100vh;
	width: 100%;
`;

const Container = styled.div`
	flex: 0.8;
	background-color: white;
	/* display: flex;
	flex-direction: row; */
`;

const MainContent = styled.div`
	padding-left: 5%;
	height: 15%;
	margin-right: 5%;
`;
