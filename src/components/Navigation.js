import React, {useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Navigation({ Logo, text, color }) {
	return (
		<Container>
			<LogoField style={{color: color}} className="logoField">
				<Logo />
			</LogoField>
			<LogoText style={{color: color}} className="logoText">{text}</LogoText>
		</Container>
	);
}

export default Navigation;

const Container = styled.div`
	cursor: pointer;
	display: flex;
	flex-direction: row;
	margin-bottom: 8%;

	.logoField {
		color: #5f6670;
		flex: 0.1;
		display: flex;
		padding-top: 15px;
	}

	.logoText {
		color: #5f6670;
		flex: 0.9;
		font-size: 12px;
		font-weight: bold;
		margin-left: 5%;
		margin-top: 8%;
		font-family: Helvetica;
	}

	&:hover {
		.logoField {
			color: #b20505;
      /* #de596a */
		}
		.logoText {
			color: #b20505;
		}
		/* color: red; */
	}
	/* &:active{
        color: #e6007e;
    } */
`;

const LogoField = styled.div`
	color: #9a9b9c;
	flex: 0.1;
	display: flex;
	padding-top: 15px;
`;

const LogoText = styled.div`
	color: #9a9b9c;
	flex: 0.9;
	font-size: 12px;
	font-weight: bold;
	margin-left: 5%;
	margin-top: 8%;
	font-family: Helvetica;
`;
