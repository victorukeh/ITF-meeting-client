import React from "react";
import styled from "styled-components";
import { useDataLayerValue } from "../reducer/DataLayer";

const Header = () => {
	const [{ token, user }, dispatch] = useDataLayerValue();
	user.title = 'Dr'
	user.fullName = 'Gambo Neimogah'
	user.department = 'Information and Communication Technology '
	user.position= 'Director'
	return (
		<>
			<HeaderText>Welcome {user.title}. {user.fullName}</HeaderText>
			<HeaderParagraph>{user.position}, {user.department}</HeaderParagraph>
			<Line className="solid" />
		</>
	);
};

export default Header;

const HeaderText = styled.h3`
	font-family: "Segoe UI", Arial, sans-serif;
	color: #b03f58;
	font-family: Verdana;
	margin-bottom: 0%;
`;

const HeaderParagraph = styled.p`
	margin-bottom: 2%;
	font-size: 15px;
	font-family: Cambria;
`;

const Line = styled.hr`
	border-top: 1px solid #bbb;
	margin-right: 5%;
`;