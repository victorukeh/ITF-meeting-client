import React from "react";
import Sidebar from "../components/Sidebar";
import Body from "../components/Body";
import Dashboard from "./Dashboard";
import styled from "styled-components";
import AddMeeting from "./AddMeeting";
import Meeting from "./Meeting";
import Header from "../components/Header";
import AddAgenda from "../layouts/AddAgenda"
import Preview from "../layouts/Preview"
import SetMeeting from "../layouts/SetMeeting"
import UserMeeting from "../layouts/UserMeeting"
import ViewComments from "../layouts/ViewComments"
import {
	Routes,
	Route,
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
							<Route path="/meeting/admin" element={<Meeting />} />
							<Route path="/meeting" element={<UserMeeting />} />
							<Route path="/meeting/agenda" element={<AddAgenda />} />
							<Route path="/meeting/create" element={<AddMeeting />} />
							<Route path="/meeting/agenda/preview" element={<Preview />} />
							<Route path="/meeting/comments" element={<ViewComments />} />
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
	/* overflow-y: hidden; */
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
