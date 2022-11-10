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
import Loading from "../components/Loading";
import axios from "axios";

const SetMeeting = () => {
	const [{ meetings, loading, token }, dispatch] = useDataLayerValue();
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
		try {
			dispatch({
				type: "SET_LOADING",
				loading: true
			})
			const response = await axios.get(
				`${process.env.REACT_APP_URL}/meeting?limit=50`, {
				headers: { Authorization: `Bearer ${token}` },
			}
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
			dispatch({
				type: "SET_LOADING",
				loading: false
			})
		} catch (err) {
			console.log(err)
			if (err.response.status === 401) {
				window.localStorage.removeItem("token")
				window.location.reload(false)
			}
		}
	};

	const setPageMeetings = async (value) => {
		const last = value * 5;
		const first = last - 5;
		const result = meetings.slice(first, last);
		setMappedMeetings(result);
	};

	const resetAll = async () => {
		dispatch({
			type: "SET_FULLAGENDA",
			fullAgenda: []
		})
		await dispatch({
			type: "SET_ADDMEETING",
			addMeeting: { title: "", description: "", start: "" }
		})
		window.localStorage.setItem("addMeeting", JSON.stringify({ title: "", description: "", start: "" }));
		dispatch({
			type: "SET_AGENDAS",
			agendas: []
		})

		window.localStorage.setItem("fullAgenda", JSON.stringify([]))
		window.localStorage.setItem("agendas", JSON.stringify([]))
	}

	const deleteMeeting = (id, index, newState) => async () => {
		try {
			const docs = await axios.get(
				`${process.env.REACT_APP_URL}/meeting/docs?meeting=${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			}
			);
			for (const doc of docs.data.docs) {
				await axios.delete(
					`${process.env.REACT_APP_URL}/meeting/document/delete?document=${doc._id}`, {
					headers: { Authorization: `Bearer ${token}` },
				}
				);
			}
			await axios.delete(
				`${process.env.REACT_APP_URL}/meeting/agenda/delete?meeting=${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			}
			);
			const message = await axios.delete(
				`${process.env.REACT_APP_URL}/meeting/delete?meeting=${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			}
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
			`${process.env.REACT_APP_URL}/meeting/find?title=${d}`, {
			headers: { Authorization: `Bearer ${token}` },
		}
		);
		const f = fetchMeeting.data.meeting;
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
	};
	return (
		<>
			{!loading ? <>
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
						onClick={() => resetAll()}
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
			</> : <Loader>
				<Loading type="spin" color="#7485e8" />
			</Loader>}
		</>
	);
};

const Loader = styled.div`
	width: 100%;
 	height: 70vh; 
 	display: flex;
	align-items: center;
	flex-direction: column;
 	justify-content: center
`

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
