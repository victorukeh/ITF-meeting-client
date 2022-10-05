import React, { useEffect } from "react";
import Navigation from "./Navigation";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../styles/img/itf-logo.jpg";
import PeopleIcon from "@mui/icons-material/People";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import ArticleIcon from "@mui/icons-material/Article";
import LockIcon from "@mui/icons-material/Lock";
import { useDataLayerValue } from "../reducer/DataLayer";

import { NavLink, Link } from "react-router-dom";

const Sidebar = () => {
	const [{ checkMeeting, user }, dispatch] = useDataLayerValue();

	const signOut = (newState) => async () => {
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("user");
		await window.location.reload();
		await dispatch({
			type: "SET_SNACKBAR",
			snackbar: {
				open: true,
				notification: "You are now logged out",
				...newState,
			},
		});
	};
	return (
		<Container>
			<Header>
				<ItfLogo
					src={Logo}
					style={{
						cursor: "pointer",
						flex: "0.2",
						width: "17%",
						height: "17%",
						marginLeft: "0%",
					}}
				/>
				<HeaderText>Management Meeting</HeaderText>
			</Header>
			<SubHeader>Menu</SubHeader>
			<NavLink style={{ textDecoration: "none" }} to="/">
				<Navigation Logo={ViewAgendaIcon} text="Dashboard" />
			</NavLink>
			{checkMeeting && (
				<NavLink style={{ textDecoration: "none" }} to="/meeting">
					<Navigation Logo={ArticleIcon} text="Meeting" />
				</NavLink>
			)}
			<NavLink style={{ textDecoration: "none" }} to="/vote">
				<Navigation Logo={HowToVoteIcon} text="Vote" />
			</NavLink>

			<NavLink style={{ textDecoration: "none" }} to="/users">
				{user.role === "admin" && <Navigation Logo={PeopleIcon} text="Users" />}
			</NavLink>
			{user.role === "admin" && (
				<NavLink style={{ textDecoration: "none" }} to="/meeting/admin">
					<Navigation Logo={MeetingRoomIcon} text="Set Meetings" />
				</NavLink>
			)}
			<Navigation Logo={LockIcon} text="Change Password" />
			<Link
				style={{ textDecoration: "none" }}
				to="/"
				onClick={signOut({
					vertical: "top",
					horizontal: "right",
				})}
			>
				<Navigation Logo={LogoutIcon} text="Sign out" />
			</Link>
		</Container>
	);
};

export default Sidebar;

const ItfLogo = styled.img`
	width: 15%;
	margin-left: 38%;
	margin-top: 15%;
`;

const Container = styled.div`
	flex: 0.2;
	background-color: #fff;
	height: 100vh;
	padding-left: 2%;
	border-right: 2px solid #c5c7c9;
	/* background: linear-gradient(360deg, rgba(63, 63, 253, 0.8) 0%, rgba(255, 255, 255, 0) 25%); */
`;

const Header = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: -4%;
	width: 100%;
`;

const HeaderText = styled.p`
	color: #0e2345;
	margin-top: 21%;
	margin-left: 5%;
	font-family: Helvetica;
	font-size: 17px;
	font-weight: bold;
`;

const SubHeader = styled.p`
	margin-top: 10%;
	font-weight: bold;
	font-family: "Segoe UI", Arial, sans-serif;
	font-size: 12px;
`;
