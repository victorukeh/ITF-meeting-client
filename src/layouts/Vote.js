import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDataLayerValue } from "../reducer/DataLayer";
import Button from "@mui/material/Button";
import styled from "styled-components";
import PreviewIcon from "@mui/icons-material/Preview";
import { Link } from "react-router-dom";
import Back from "../components/Back";
import MeetingPreview from "../components/MeetingPreview";
import axios from "axios";

const Vote = () => {
	const [{ user, pollsForMeeting, token, viewMeeting }, dispatch] = useDataLayerValue();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		getPolls()
	}, [])

	const getPolls = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_URL}/meeting/poll-meet?meeting=${viewMeeting._id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			await dispatch({
				type: "SET_POLLSFORMEETING",
				pollsForMeeting: response.data.polls,
			});
			window.localStorage.setItem("pollsForMeeting", JSON.stringify(response.data.polls));
		} catch (err) {
			if (err.response.status === 401) {
				window.localStorage.removeItem("token")
				window.location.reload(false)
			}
		}
	};

	const deletePoll = (id, index, newState) => async () => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_URL}/meeting/polls/delete?poll=${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			}
			);
			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					notification: response.data.message,
					...newState,
				},
			});
			dispatch({
				type: "SET_POLLSFORMEETING",
				pollsForMeeting: pollsForMeeting.filter((o, i) => index !== i + 1),
			});
			window.localStorage.setItem("pollsForMeeting", JSON.stringify(pollsForMeeting.filter((o, i) => index !== i + 1)))
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

	const getPoll = async (id) => {
		let response = await axios.get(
			`${process.env.REACT_APP_URL}/meeting/poll?poll=${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		}
		);
		await dispatch({
			type: "SET_POLL",
			poll: response.data.poll,
		});
		window.localStorage.setItem("poll", JSON.stringify(response.data.poll));
		response = await axios.get(
			`${process.env.REACT_APP_URL}/meeting/options?poll=${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		}
		);
		await dispatch({
			type: "SET_OPTIONS",
			options: response.data.options,
		});
		window.localStorage.setItem(
			"options",
			JSON.stringify(response.data.options)
		);
	};
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<Back to="/meetings/meeting" color="primary" />
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
				{user.role === "admin" && (
					<Link
						style={{ textDecoration: "none" }}
						to="/meetings/meeting/poll/create"
					>
						<Button variant="contained">+ NEW POLL</Button>
					</Link>
				)}
			</div>
			<TableContainer
				component={Paper}
				style={{ overflowY: "auto", height: "64vh" }}
			>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Question</TableCell>
							<TableCell>Date</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{pollsForMeeting.map((row, id) => {
							const date = new Date(row.createdAt).toUTCString();
							return (
								<TableRow
									key={id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row.question}
									</TableCell>
									<TableCell>{date}</TableCell>
									<TableCell align="right">
										<Action>
											<Edit onClick={() => getPoll(row._id)}>
												<Link
													style={{ textDecoration: "none" }}
													to="/meetings/polls/view"
												>
													<PreviewIcon className="logo" />
												</Link>
											</Edit>
											{/* <Edit>
												<EditIcon className="logo" />
											</Edit> */}
											<Delete
												onClick={deletePoll(row._id, id + 1, {
													vertical: "top",
													horizontal: "right",
												})}
											>
												<DeleteIcon className="logoField" />
											</Delete>
										</Action>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
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
export default Vote;
