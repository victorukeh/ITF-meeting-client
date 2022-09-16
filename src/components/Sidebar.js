import React from "react";
import Navigation from "./Navigation";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../styles/img/itf-logo.jpg";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import ArticleIcon from "@mui/icons-material/Article";

const Sidebar = () => {
	return (
		<Container>
			<Header>
				<ItfLogo
					src={Logo}
					style={{
						cursor: "pointer",
						flex: "0.2",
						width: "20%",
						height: "20%",
						marginLeft: "0%",
					}}
				/>
				<HeaderText>Management Meeting</HeaderText>
			</Header>
			<SubHeader>
				Menu
			</SubHeader>
			<Navigation Logo={ViewAgendaIcon} text="Agenda" />
			<Navigation Logo={ArticleIcon} text="Meeting Documents" />
			<Navigation Logo={HowToVoteIcon} text="Vote" />
			<Navigation Logo={LogoutIcon} text="Sign out" />
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
    /* background: linear-gradient(100deg, rgba(63, 63, 63, 0.8) 0%, rgba(255, 255, 255, 0) 25%); */
	flex: 0.2;
	background-color: #fff;
	height: 100vh;
	margin-left: 2%;
	border-right: 2px solid #c5c7c9;
`;

const Header = styled.div`
	display: flex;
	flex-direction: row;
    margin-top: -4%;
	/* width: 20vw; */
	width: 100%;
`;

const HeaderText = styled.p`
	color: #0e2345;
	margin-top: 21%;
	margin-left: 5%;
	font-family: Helvetica;
	font-size: 19px;
	font-weight: bold;
`;

const SubHeader = styled.p`
	margin-top: 10%;
	font-weight: bold;
	font-family: "Segoe UI", Arial, sans-serif;
	font-size: 12px;
`;
