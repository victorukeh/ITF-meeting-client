import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDataLayerValue } from "../reducer/DataLayer";
import { Link } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Groups2Icon from "@mui/icons-material/Groups2";
import styled from "styled-components";

const Meeting = () => {
	const [{ token, user, meetings, agendaAndDocs }, dispatch] =
		useDataLayerValue();

	const [open, setOpen] = useState(true);

	useEffect(() => {
		getmeetings();
	}, []);

	const onClickHandler = async (f) => {
		await dispatch({
			type: "SET_VIEWMEETING",
			viewMeeting: f,
		});
		window.localStorage.setItem("viewMeeting", JSON.stringify(f));
		await dispatch({
			type: "SET_AGENDAANDDOCS",
			agendaAndDocs: [],
		});
		await dispatch({
			type: "SET_CHECKMEETING",
			checkMeeting: true,
		});
		const response = await axios.get(
			`http://localhost:2000/api/v1/meeting/agendas?meeting=${f._id}`
		);
		let array = [];
		for (const agenda of response.data.agendas) {
			const docs = await axios.get(
				`http://localhost:2000/api/v1/meeting/agenda/docs?meeting=${f._id}&agenda=${agenda._id}`
			);
			const file = {
				agenda: agenda,
				docs: docs.data.docs,
			};
			array.push(file);
		}
		await dispatch({
			type: "SET_AGENDAANDDOCS",
			agendaAndDocs: array,
		});
		window.localStorage.setItem("agendaAndDocs", JSON.stringify(array));
	};

	const getmeetings = async () => {
		const response = await axios.get(
			"http://localhost:2000/api/v1/meeting?limit=10"
		);
		await dispatch({
			type: "SET_MEETINGS",
			meetings: response.data.meetings,
		});

		window.localStorage.setItem(
			"meetings",
			JSON.stringify(response.data.meetings)
		);
	};
	return (
		// <Container>
		// 	<HeaderText>Recent Meetings</HeaderText>
		// 	{meetings.map((f, id) => {
		// 		return (
		// 			<Links key={id} onClick={() => onClickHandler(f)}>
		// 				{user.role === "admin" && (
		// 					<Link to="/meeting" style={{ textDecoration: "none" }}>
		// 						{id + 1}. {f.title}
		// 					</Link>
		// 				)}
		// 				{/* {user.role === "admin" && <Link style={{textDecoration: "none"}}>{id + 1}. {f.title}</Link>} */}
		// 			</Links>
		// 		);
		// 	})}
		// </Container>
		<List
			sx={{
				width: "100%",
				maxWidth: 400,
				flex: "0.5",
				mr: 1,
			}}
			component="nav"
			aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					Management Meetings
				</ListSubheader>
			}
			// style={{overflowY: "hidden", height: "70vh"}}
		>
			{meetings.slice(0, 5).map((f, id) => {
				const date = new Date(f.start).toUTCString();
				return (
					<ListItemButton key={id}>
						<ListItemIcon>
							<Groups2Icon />
						</ListItemIcon>
						<Link
							style={{ textDecoration: "none", color: "#333" }}
							key={id}
							to="/meetings/meeting"
							onClick={() => onClickHandler(f)}
						>
							<ListItemText primary={f.title} secondary={date} />
						</Link>
					</ListItemButton>
				);
			})}
		</List>
	);
};

export default Meeting;

const Container = styled.div`
	flex: 0.5;
	padding-top: 1%;
	margin-right: 5%;
`;

const HeaderText = styled.h3`
	font-family: Helvetica;
	font-size: 1.4rem;
`;

const Links = styled.p`
	cursor: pointer;
`;
