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

const Meeting = () => {
	const [{ meetings, token }, dispatch] =
		useDataLayerValue();

	useEffect(() => {
		getmeetings();
	}, []);

	const onClickHandler = async (f) => {
		await dispatch({
			type: "SET_LOADING",
			loading: true
		})
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
			`${process.env.REACT_APP_URL}/meeting/agendas?meeting=${f._id}`, {
			headers: { Authorization: `Bearer ${token}` },
		}
		);
		let array = [];
		for (const agenda of response.data.agendas) {
			const docs = await axios.get(
				`${process.env.REACT_APP_URL}/meeting/agenda/docs?meeting=${f._id}&agenda=${agenda._id}`, {
				headers: { Authorization: `Bearer ${token}` },
			}
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
		await dispatch({
			type: "SET_LOADING",
			loading: false
		})
	};

	const getmeetings = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_URL}/meeting?limit=10`, {
				headers: { Authorization: `Bearer ${token}` },
			}
			);
			await dispatch({
				type: "SET_MEETINGS",
				meetings: response.data.meetings,
			});

			window.localStorage.setItem(
				"meetings",
				JSON.stringify(response.data.meetings)
			)
		} catch (err) {
			if (err.response.status === 401) {
				window.localStorage.removeItem("token")
				window.location.reload(false)
			}
		}
	};
	return (
		<List
			sx={{
				width: "100%",
				maxWidth: 400,
				flex: "0.5",
				mr: 1,
				backgroundColor: "#fff" 
			}}
			component="nav"
			aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					Management Meetings
				</ListSubheader>
			}
		>
			{meetings.slice(0, 6).map((f, id) => {
				const date = new Date(f.start).toUTCString();
				return (
					<ListItemButton key={id}>
						<ListItemIcon>
							<Groups2Icon />
						</ListItemIcon>
						<Link
							style={{ textDecoration: "none", color: "#333"}}
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
