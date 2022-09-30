import { Link } from "react-router-dom";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDataLayerValue } from "../reducer/DataLayer";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const AddMeeting = () => {
	const [{ fileList, agenda, addMeeting, meeting, fullAgenda }, dispatch] =
		useDataLayerValue();
	const handleAgendaChange = async (event) => {
		await dispatch({
			type: "SET_AGENDA",
			agenda: event.target.value,
		});
	};
	const [agendas, setagendas] = React.useState([]);
	const [files, setFiles] = useState([]);
	// const [agendaName, setagendaName] = useState("");
	const [selectedFiles, setSelectedFiles] = useState(null);
	const addnewAgenda = async () => {
		setagendas((x) => {
			return [...x, { name: agenda, id: agendas.length + 1, selectedFiles }];
		});
		const docs = files;
		console.log(docs)
		// for (const file of selectedFiles) {
		// 	docs.push(file);
		// }
		const file = {
			agenda: agenda,
			docs: docs,
		};
		console.log(file)
		setFiles([])
		fullAgenda.push(file);
		await dispatch({
			type: "SET_FULLAGENDA",
			fullAgenda: fullAgenda,
		});
		await dispatch({
			type: "ADD_FILE_TO_LIST",
			fileList: [],
		});
		await dispatch({
			type: "SET_AGENDA",
			agenda: "",
		});
		setSelectedFiles(null);
	};

	const removeAgenda = (m) => {
		setagendas((x) => {
			return [...x].filter((x) => x.id !== m.id);
		});
	};

	const getFilesName = (m) => {
		let text = "";

		if (m.selectedFiles) {
			for (let i = 0; i <= m.selectedFiles?.length - 1; i++) {
				text += m?.selectedFiles[i]?.name + ", ";
			}
		}

		return text;
	};
	return (
		<>
			<div style={{ marginRight: "5%", marginTop: "2%" }}>
				<Box
					component="form"
					sx={{
						"& > :not(style)": { m: 1, width: "100%" },
					}}
					noValidate
					autoComplete="off"
				>
					<div
						style={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							margin: "20px 0",
						}}
					>
						<h3>Agendas - {agendas.length}</h3>
						<Link
							to="/meeting/agenda/preview"
							style={{ color: "white", textDecoration: "none" }}
						>
							<Button variant="contained" color="success">
								Preview
							</Button>
						</Link>
					</div>

					<div
						style={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							margin: "20px 0",
						}}
					>
						<TextField
							id="outlined-basic"
							label="Agenda info"
							variant="outlined"
							size="small"
							fullWidth
							value={agenda}
							style={{
								marginTop: 10,
								marginRight: 10,
								maxWidth: "500px",
							}}
							onChange={handleAgendaChange}
						/>

						<IconButton
							color="primary"
							aria-label="upload picture"
							component="label"
						>
							<input
								hidden
								accept="image/*,application/*"
								type="file"
								multiple
								onChange={(e) => {
									let hold = []
									for(const file of e.target.files){
										hold.push(file)
									}
									setFiles(hold)
									setSelectedFiles(e.target.files);
								}}
							/>
							<UploadFileIcon />
						</IconButton>
					</div>

					<div>
						<Button
							variant="contained"
							component="label"
							onClick={addnewAgenda}
							disabled={agenda.length > 0 ? false : true}
						>
							Add Agenda
						</Button>
					</div>

					{agendas.map((m, id) => {
						const txts = getFilesName(m);
						return (
							<ListItemButton key={id} onClick={() => removeAgenda(m)}>
								<ListItemIcon>
									<DeleteIcon />
								</ListItemIcon>
								<ListItemText primary={m.name} secondary={txts} />
							</ListItemButton>
						);
					})}
				</Box>
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
