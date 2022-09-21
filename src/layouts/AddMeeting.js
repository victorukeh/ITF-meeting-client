import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DragAndDrop from "../components/DragAndDrop";
import { useDataLayerValue } from "../reducer/DataLayer";

const AddMeeting = () => {
	const [{ fileList, addMeeting, meeting }, dispatch] = useDataLayerValue();
	const createMeeting = async () => {
		const response = await axios.post(
			"http://localhost:2000/api/v1/meeting/create-meeting",
			{
				name: addMeeting,
			}
		);
        console.log(response)
		await dispatch({
			type: "SET_MEETING",
			meeting: response.data.meeting,
		});
	};

	const handleMeetingChange = (event) => {
		dispatch({
			type: "SET_ADDMEETING",
			addMeeting: event.target.value,
		});
	};
	return (
		<>
			<div style={{ marginRight: "5%", marginTop: "5%" }}>
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={5}>
							<h3 style={{ color: "#0e2345" }}>Meeting Name: </h3>
						</Grid>
						<Grid item xs={7}>
							<TextField
								style={{ marginTop: "2%" }}
								onChange={handleMeetingChange}
								fullWidth
							/>
						</Grid>
					</Grid>
				</Box>
				<Button
					variant="text"
					style={{ marginTop: "10%", marginLeft: "40vw", width: "40%" }}
					onClick={createMeeting}
				>
					Add Meeting
				</Button>
			</div>
		</>
	);
};

export default AddMeeting;

const Container = styled.div`
	flex: 0.8;
	background-color: white;
	display: flex;
	flex-direction: row;
`;

const MainContent = styled.div`
	padding-left: 5%;
	width: 100%;
	height: 15%;
	margin-right: 5%;
	/* background: white; */
`;
