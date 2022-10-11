import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddAgenda from "./AddAgenda";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Link } from "react-router-dom";
import Back from "../components/Back";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useDataLayerValue } from "../reducer/DataLayer";

const AddMeeting = () => {
	const [{ fileList, addMeeting, meeting }, dispatch] = useDataLayerValue();
	const datetime = new Date().toISOString();
	const [start, setStart] = useState(dayjs(datetime));
	const [end, setEnd] = useState(dayjs(datetime));
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const handleChange = (event) => {
		const date = new Date(event.target.value).toISOString();
		setStart(date);
	};

	const handleChange2 = (newValue) => {
		const date = new Date(newValue).toISOString();
		setEnd(date);
	};
	const handleMeetingChange = async () => {
		const meeting = {
			title: title,
			description: description,
			start: start,
			// end: end,
		};
		await dispatch({
			type: "SET_ADDMEETING",
			addMeeting: {
				title: meeting.title,
				description: meeting.description,
				start: meeting.start,
				// end: meeting.end,
			},
		});
		await dispatch({
			type: "SET_FULLAGENDA",
			fullAgenda: [],
		});
	};

	const handleMeetingTitle = (event) => {
		setTitle(event.target.value);
	};

	const handleMeetingDescription = (event) => {
		setDescription(event.target.value);
	};
	return (
		<>
			{/* <div style={{ marginRight: "5%", marginTop: "5%" }}>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<h3 style={{ color: "#0e2345" }}>End: </h3>
						</Grid>
						<Grid item xs={7}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateTimePicker
									label="Set Date & Time"
									value={end}
									onChange={handleChange2}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</Grid>
					</Grid>
				</Box>
			</div> */}
				<Back color="Primary" to="/meeting/admin"/>
			<Container>
				<Box
					component="form"
					sx={{
						"& > :not(style)": { m: 1, width: "100%" },
					}}
					noValidate
					autoComplete="off"
				>
					<h3>New Meeting Information</h3>
					<div style={{ maxWidth: "500px" }}>
						<TextField
							id="outlined-basic"
							label="Enter new meeting name"
							variant="outlined"
							fullWidth
							size="small"
							onChange={handleMeetingTitle}
							style={{
								marginTop: 10,
								marginBottom: 10,
							}}
						/>

						<TextField
							id="outlined-basic"
							label="Enter new meeting description"
							variant="outlined"
							onChange={handleMeetingDescription}
							fullWidth
							size="small"
						/>

						<TextField
							id="datetime-local"
							type="datetime-local"
							defaultValue="2022-10-24T10:30"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={handleChange}
							variant="outlined"
							size="small"
							style={{
								marginTop: 10,
								marginBottom: 10,
							}}
						/>
					</div>
				</Box>
				<Link
					style={{ textDecoration: "none", color: "white" }}
					to="/meeting/agenda"
					onClick={() => handleMeetingChange()}
				>
					<Button
						variant="contained"
						style={{ marginTop: "3%", marginLeft: "40vw", width: "40%" }}
						disabled={title.length < 1 ? true : false}
					>
						Add Meeting
					</Button>
				</Link>
			</Container>
		</>
	);
};

export default AddMeeting;

const Container = styled.div`
	margin-top: 4%;
`;

const MainContent = styled.div`
	padding-left: 5%;
	width: 100%;
	height: 15%;
	margin-right: 5%;
	/* background: white; */
`;
