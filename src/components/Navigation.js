import React from "react";
import styled from "styled-components";

function Navigation({ Logo, text }) {
	return (
		// <Container>
		//     <LogoField><Logo/></LogoField>
		//     <LogoText>{text}</LogoText>

		// </Container>

		<Container>
			<LogoField className="logoField">
				<Logo />
			</LogoField>
			<LogoText className="logoText">{text}</LogoText>
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
			color: #f2a5ac;
      /* #de596a */
		}
		.logoText {
			color: #f2a5ac;
		}
		/* color: red; */
	}
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
