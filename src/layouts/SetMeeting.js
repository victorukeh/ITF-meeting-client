import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useDataLayerValue } from "../reducer/DataLayer";
import Button from "@mui/material/Button";
import styled from "styled-components";
import PreviewIcon from '@mui/icons-material/Preview';
import { Link } from "react-router-dom";
import AddCommentIcon from "@material-ui/icons/AddComment";
import MeetingPreview from "../components/MeetingPreview";
import axios from "axios";

const SetMeeting = () => {
	const [{ meetings }, dispatch] = useDataLayerValue();
	const [open, setOpen] = useState(false);

	const deleteMeeting = async (id, index) => {
		const deleted = meetings.filter((o, i) => index !== i);
		dispatch({
			type: "SET_MEETINGS",
			meetings: deleted,
		});
		const docs = await axios.get(
			`http://localhost:2000/api/v1/meeting/docs?meeting=${id}`
		);
		for (const doc of docs.data.docs) {
			await axios.delete(
				`http://localhost:2000/api/v1/meeting/document/delete?document=${doc._id}`
			);
		}
		await axios.delete(
			`http://localhost:2000/api/v1/meeting/agendas/delete?meeting=${id}`
		);
		const message = await axios.delete(
			`http://localhost:2000/api/v1/meeting/delete?meeting=${id}`
		);
		await dispatch({
			type: "SET_NOTIFICATION",
			notification: message.data.message,
		});
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
				<Link style={{ textDecoration: "none" }} to="/meeting/create">
					<Button variant="contained">ADD NEW MEETING</Button>
				</Link>
			</div>
			<TableContainer component={Paper}>
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
						{meetings.map((row, id) => {
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
											<Edit onClick={handleClickOpen}>
												<PreviewIcon className="logo" />
											</Edit>
											<Edit>
												<EditIcon className="logo" />
											</Edit>
											<Delete>
												<DeleteIcon
													className="logoField"
													onClick={() => deleteMeeting(row._id, id + 1)}
												/>
											</Delete>
										</Action>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			{/* <TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell>S/N</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Start Time</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{meetings.map((row, id) => {
							const date = row.start;
							const check = new Date(date).toUTCString();
							return (
								<TableRow
									key={id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell>{id + 1}</TableCell>
									<TableCell component="th" scope="row">
										<Link style={{ textDecoration: "none", color: "black" }}>
											{row.title}
										</Link>
									</TableCell>
									<TableCell>{check}</TableCell>
									<TableCell align="right">
										<Action>
											<Edit>
												<AddCommentIcon className="logo" />
											</Edit>
											<Edit>
												<EditIcon className="logo" />
											</Edit>
											<Delete>
												<DeleteIcon
													className="logoField"
													onClick={() => deleteMeeting(row._id, id + 1)}
												/>
											</Delete>
										</Action>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<div
				style={{
					width: "100%",
					display: "flex",
					marginTop: "4%",
					justifyContent: "flex-end",
				}}
			>
				<Button variant="contained" color="primary" style={{ marginLeft: "" }}>
					<Link
						style={{ textDecoration: "none", color: "white" }}
						to="/meeting/create"
					>
						Create New Meeting
					</Link>
				</Button>
			</div> */}
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
