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
	const [{ token, addMeeting }, dispatch] = useDataLayerValue();
	console.log(addMeeting)
	const handleChange = (event) => {
		const date = event.target.value;
		dispatch({
			type: "SET_ADDMEETING",
			addMeeting: { ...addMeeting, start: date.split(".")[0] }
		});
	};

	const handleMeetingChange = async () => {
		window.localStorage.setItem("addMeeting", JSON.stringify(addMeeting));
	};

	const handleMeetingTitle = (event) => {
		dispatch({
			type: "SET_ADDMEETING",
			addMeeting: { ...addMeeting, title: event.target.value }
		});
	};

	const handleMeetingDescription = (event) => {
		dispatch({
			type: "SET_ADDMEETING",
			addMeeting: { ...addMeeting, description: event.target.value }
		});
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
							value={addMeeting.title}
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
							value={addMeeting.description}
							onChange={handleMeetingDescription}
							fullWidth
							size="small"
						/>

						<TextField
							id="datetime-local"
							type="datetime-local"
							defaultValue={addMeeting.start}
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
						disabled={addMeeting.title.length < 1 ? true : false}
					// onClick={() => dispatch({
					// 	type: "SET_AGENDAS",
					// 	agendas: []
					// })}
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