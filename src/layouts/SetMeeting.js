import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useDataLayerValue } from "../reducer/DataLayer";
import Button from "@mui/material/Button";
import styled from "styled-components";
import PreviewIcon from "@mui/icons-material/Preview";
import { Link } from "react-router-dom";
import AddCommentIcon from "@material-ui/icons/AddComment";
import MeetingPreview from "../components/MeetingPreview";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

const SetMeeting = () => {
	const [{ meetings }, dispatch] = useDataLayerValue();
	const [open, setOpen] = useState(false);
	const [mappedMeetings, setMappedMeetings] = useState([]);
	const [meetingTitles, setMeetingTitles] = useState([]);

	const filterData = (query, data) => {
		if (!query) {
			return data;
		} else {
			return data.filter((d) => d.toLowerCase().includes(query));
		}
	};

	useEffect(() => {
		getmeetings();
	}, []);

	const getmeetings = async () => {
		const response = await axios.get(
			"http://localhost:2000/api/v1/meeting?limit=50"
		);
		await dispatch({
			type: "SET_MEETINGS",
			meetings: response.data.meetings,
		});
		setMappedMeetings(response.data.meetings.slice(0, 5));
		let array = [];
		for (const meeting of response.data.meetings) {
			array.push(meeting.title);
		}
		setMeetingTitles(array);
		window.localStorage.setItem(
			"meetings",
			JSON.stringify(response.data.meetings)
		);
	};

	const setPageMeetings = async (value) => {
		const last = value * 5;
		const first = last - 5;
		const result = meetings.slice(first, last);
		setMappedMeetings(result);
	};

	const deleteMeeting = (id, index, newState) => async () => {
		try {
			const docs = await axios.get(
				`http://localhost:2000/api/v1/meeting/docs?meeting=${id}`
			);
			for (const doc of docs.data.docs) {
				await axios.delete(
					`http://localhost:2000/api/v1/meeting/document/delete?document=${doc._id}`
				);
			}
			await axios.delete(
				`http://localhost:2000/api/v1/meeting/agenda/delete?meeting=${id}`
			);
			const message = await axios.delete(
				`http://localhost:2000/api/v1/meeting/delete?meeting=${id}`
			);
			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					notification: message.data.message,
					...newState,
				},
			});

			const deleted = meetings.filter((o, i) => index !== i);
			setMappedMeetings(deleted);
			window.localStorage.setItem("meetings", JSON.stringify(deleted));
			dispatch({
				type: "SET_MEETINGS",
				meetings: deleted,
			});
		} catch (err) {
			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					error: true,
					notification: err.message,
					...newState,
				},
			});
		}
	};

	const setMeeting = (meeting, newState) => async () => {
		dispatch({
			type: "SET_MEETING",
			setMeeting: meeting,
		});
		window.localStorage.setItem("setMeeting", JSON.stringify(meeting));
	};
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onClickHandler = async (d) => {
		const fetchMeeting = await axios.get(
			`http://localhost:2000/api/v1/meeting/find?title=${d}`
		);
		const f = fetchMeeting.data.meeting;
		console.log(f);
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
	return (
		<>
			<MeetingPreview
				handleClose={handleClose}
				handleClickOpen={handleClickOpen}
				open={open}
				setOpen={setOpen}
			/>
			<div
				style={{
					width: "100%",
					display: "flex",
					alignItems: "flex-end",
					justifyContent: "flex-end",
					margin: "20px 0",
				}}
			>
				<Link
					style={{ textDecoration: "none" }}
					to="/set-meetings/meeting/create"
				>
					<Button variant="contained">ADD NEW MEETING</Button>
				</Link>
			</div>
			<TableContainer
				component={Paper}
				style={{
					paddingBottom: "0.4%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Meeting Name</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Date</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{mappedMeetings.map((row, id) => {
							const date = new Date(row.start).toUTCString();
							return (
								<TableRow
									key={id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row.title}
									</TableCell>
									<TableCell>{row.description}</TableCell>
									<TableCell>{date}</TableCell>
									<TableCell align="right">
										<Action>
											<Edit onClick={() => onClickHandler(row._id)}>
												<Link
													style={{ textDecoration: "none" }}
													to="/meetings/meeting"
												>
													<PreviewIcon className="logo" />
												</Link>
											</Edit>
											<Edit>
												<Link
													style={{ textDecoration: "none" }}
													to="/set-meetings/meeting/admin/edit"
												>
													<EditIcon
														className="logo"
														onClick={setMeeting(row, {
															vertical: "top",
															horizontal: "right",
														})}
													/>
												</Link>
											</Edit>
											<Delete>
												<DeleteIcon
													className="logoField"
													onClick={deleteMeeting(row._id, id + 1, {
														vertical: "top",
														horizontal: "right",
													})}
												/>
											</Delete>
										</Action>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
				<Stack spacing={2} style={{ marginTop: "0.4%" }}>
					<Pagination
						count={Math.ceil(meetings.length / 5)}
						color="primary"
						onChange={(e, value) => setPageMeetings(value)}
					/>
				</Stack>
			</TableContainer>
		</>
	);
};

const Action = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
`;
const Delete = styled.div`
	.logoField {
		color: #9fa1a3;
		cursor: pointer;
		margin-right: 21%;
	}
	&:hover {
		.logoField {
			color: #f2a5ac;
		}
	}
`;

const Edit = styled.div`
	.logo {
		color: #9fa1a3;
		cursor: pointer;
	}
	&:hover {
		.logo {
			color: #f2a5ac;
		}
	}
`;
export default SetMeeting;
