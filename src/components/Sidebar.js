import React from "react";
import Navigation from "./Navigation";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../styles/img/itf-logo.jpg";
import PeopleIcon from "@mui/icons-material/People";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import styled from "styled-components";
import ArticleIcon from "@mui/icons-material/Article";
import LockIcon from "@mui/icons-material/Lock";
import { useDataLayerValue } from "../reducer/DataLayer";
import { NavLink, Link } from "react-router-dom";
import "../styles/css/sidebar.css";
const Sidebar = () => {
	const [{ checkMeeting, user, polls }, dispatch] = useDataLayerValue();

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
		<>
			<Container>
				<Header>
					<ItfLogo src={Logo} />
					<HeaderText>Management Meeting</HeaderText>
				</Header>
				<SubHeader>Menu</SubHeader>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
					}}
					className={user.role === "user" ? "user" : "admin"}
				>
					<NavLink style={{ textDecoration: "none" }} to="/dashboard">
						{({ isActive }) => (
							<Navigation
								color={isActive ? "#b20505" : undefined}
								Logo={ViewAgendaIcon}
								text="Dashboard"
							/>
						)}
					</NavLink>
					<NavLink style={{ textDecoration: "none" }} to="/meetings">
						{({ isActive }) => (
							<Navigation
								color={isActive ? "#b20505" : undefined}
								Logo={ArticleIcon}
								text="Meetings"
							/>
						)}
					</NavLink>
					<NavLink style={{ textDecoration: "none" }} to="/polls">
						{({ isActive }) => (
							<Navigation
								color={isActive ? "#b20505" : undefined}
								Logo={HowToVoteIcon}
								text="Polls"
							/>
						)}
					</NavLink>

					{user.role === "admin" && (
						<NavLink style={{ textDecoration: "none" }} to="/users">
							{({ isActive }) =>
								user.role === "admin" && (
									<Navigation
										color={isActive ? "#b20505" : undefined}
										Logo={PeopleIcon}
										text="Users"
									/>
								)
							}
						</NavLink>
					)}
					{user.role === "admin" && (
						<NavLink
							style={{ textDecoration: "none" }}
							to="/set-meetings/meeting/admin"
						>
							{({ isActive }) => (
								<Navigation
									color={isActive ? "#b20505" : undefined}
									Logo={MeetingRoomIcon}
									text="Set Meetings"
								/>
							)}
						</NavLink>
					)}
					<NavLink style={{ textDecoration: "none" }} to="/change-password">
						{({ isActive }) => (
							<Navigation
								color={isActive ? "#b20505" : undefined}
								Logo={LockIcon}
								text="Change Password"
							/>
						)}
					</NavLink>
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
				</div>
			</Container>
		</>
	);
};

export default Sidebar;

const ItfLogo = styled.img`
	width: 15%;
	margin-left: 38%;
	margin-top: 15%;
	cursor: pointer;
	flex: 0.2;
	width: 17%;
	height: 17%;
	margin-left: 0%;
`;

const Container = styled.div`
	flex: 0.2;
	background-color: #fff;
	height: 100vh;
	padding-left: 2%;
	border-right: 2px solid #c5c7c9;
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

const SubContainer = styled.div`
	height: 60vh;
	display: flex;
	flex-direction: column;
	justify-content: "space-around";
`;
