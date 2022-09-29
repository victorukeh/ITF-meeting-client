import React from "react";
import styled from "styled-components";
import { useDataLayerValue } from "../reducer/DataLayer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";


const Header = () => {
	const [{ token, user }, dispatch] = useDataLayerValue();
	user.title = 'Dr'
	user.fullName = 'Gambo Neimogah'
	user.department = 'Information and Communication Technology '
	user.position= 'Director'
	return (
		<>
		<AppBar sx={{ position: "static", background: "#b20505"}}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
				<HeaderText>Welcome {user.title}. {user.fullName}</HeaderText>
				<HeaderParagraph>{user.position}, {user.department}</HeaderParagraph>
            </Typography>
          </Toolbar>
        </AppBar>

		<Line className="solid" />
			
		</>
	);
};

export default Header;

const HeaderText = styled.h3`
	font-family: "Segoe UI", Arial, sans-serif;
	color: white;
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