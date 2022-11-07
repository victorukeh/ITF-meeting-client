import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Body from "../components/Body";
import Dashboard from "./Dashboard";
import styled from "styled-components";
import AddMeeting from "./AddMeeting";
import Meeting from "./Meeting";
import Header from "../components/Header";
import AddAgenda from "../layouts/AddAgenda";
import Preview from "../layouts/Preview";
import SetMeeting from "../layouts/SetMeeting";
import UserMeeting from "../layouts/UserMeeting";
import ViewComments from "../layouts/ViewComments";
import Vote from "../layouts/Vote";
import AddUser from "./AddUser";
import Alert from "@material-ui/lab/Alert";
import Users from "../layouts/Users";
import PollView from "../layouts/PollView";
import ViewPoll from "../layouts/ViewPoll";
import Meetings from "./Meetings";
import Polls from "./Polls";
import ViewUser from "./ViewUser";
import EditMeeting from "./EditMeeting";
import EditUser from "./EditUser"
import Minutes from "./Minutes";
import ChangePassword from "./ChangePassword";
import MinuteComments from "./MinuteComments";
import { Routes, Route } from "react-router-dom";

import { useDataLayerValue } from "../reducer/DataLayer";

function Main() {
	const [{ token, viewMeeting, snackbar }, dispatch] = useDataLayerValue();

	useEffect(() => {
		const meeting = window.localStorage.getItem("viewMeeting");
		const docs = window.localStorage.getItem("agendaAndDocs");
		if (meeting !== null)
			dispatch({ type: "SET_VIEWMEETING", viewMeeting: JSON.parse(meeting) });
		if (docs !== null)
			dispatch({ type: "SET_AGENDAANDDOCS", agendaAndDocs: JSON.parse(docs) });
	}, []);
	return (
		<>
			<MainContainer>
				<Sidebar />
				<Container>
					<MainContent>
						<Header />
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/polls" element={<Polls />} />
							<Route path="/meetings/meeting/vote" element={<Vote />} />
							<Route path="/meetings/meeting/minutes" element={<Minutes />} />
							<Route path="/change-password" element={<ChangePassword />} />
							<Route
								path="/meetings/meeting/poll/create"
								element={<PollView />}
							/>
							<Route path="/users/edit" element={<EditUser />} />
							<Route path="/polls/view" element={<ViewPoll />} />
							<Route path="/meetings/polls/view" element={<ViewPoll />} />
							<Route path="/users/view" element={<ViewUser />} />
							<Route path="/users" element={<Users />} />
							<Route path="/users/create" element={<AddUser />} />
							<Route path="/meetings" element={<Meetings />} />
							<Route path="/set-meetings/meeting/admin" element={<Meeting />} />
							<Route path="/set-meetings/meeting/admin/edit" element={<EditMeeting />} />
							<Route path="/meetings/meeting" element={<UserMeeting />} />
							<Route path="/meetings/meeting/minutes/comments" element={<MinuteComments />} />
							<Route path="/meetings/meeting/agenda" element={<AddAgenda />} />
							<Route
								path="/set-meetings/meeting/create"
								element={<AddMeeting />}
							/>
							<Route
								path="/set-meetings/meeting/preview"
								element={<Preview />}
							/>
							<Route
								path="/meetings/meeting/comments"
								element={<ViewComments />}
							/>
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

	background: #d7d8e0;
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
