import styled from "styled-components";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import dayjs, { Dayjs } from "dayjs";
import { Link } from "react-router-dom";
import Back from "../components/Back";
import { useDataLayerValue } from "../reducer/DataLayer";

const AddMeeting = () => {
	const [{ token }, dispatch] = useDataLayerValue();
	const datetime = new Date().toISOString();
	const [start, setStart] = useState(dayjs(datetime));
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const handleChange = (event) => {
		const date = new Date(event.target.value).toISOString();
		setStart(date);
	};

	const handleMeetingChange = async () => {
		const meeting = {
			title: title,
			description: description,
			start: start,
		};
		await dispatch({
			type: "SET_ADDMEETING",
			addMeeting: {
				title: meeting.title,
				description: meeting.description,
				start: meeting.start,
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
			<Back color="Primary" to="/set-meetings/meeting/admin" />
			<Container>
				<Box
					component="form"
					sx={{
						"& > :not(style)": { m: 1, width: "100%" },
					}}
					noValidate
					autoComplete="off"
				>
					<Header>New Meeting Information</Header>
					<MeetingContent style={{ maxWidth: "500px" }}>
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
					</MeetingContent>
				</Box>
				<Link
					style={{ textDecoration: "none", color: "white" }}
					to="/meetings/meeting/agenda"
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

const Header = styled.h3``
const MeetingContent = styled.div``