import { Link } from "react-router-dom";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDataLayerValue } from "../reducer/DataLayer";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import styled from "styled-components";
import Back from "../components/Back";

const AddMeeting = () => {
	const [{ agenda, fullAgenda }, dispatch] = useDataLayerValue();
	const handleAgendaChange = async (event) => {
		await dispatch({
			type: "SET_AGENDA",
			agenda: event.target.value,
		});
	};
	const [agendas, setagendas] = useState([]);
	const [files, setFiles] = useState([]);
	const [selectedFiles, setSelectedFiles] = useState(null);

	const addnewAgenda = async () => {
		setagendas((x) => {
			return [...x, { name: agenda, id: agendas.length + 1, selectedFiles }];
		});
		const docs = files;
		const file = {
			agenda: agenda,
			docs: docs,
		};
		setFiles([]);
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
			<Back color="Primary" to="/set-meetings/meeting/create" />
			<Container>
				<Box
					component="form"
					sx={{
						"& > :not(style)": { m: 1, width: "100%" },
					}}
					noValidate
					autoComplete="off"
				>
					<MainContent>
						<Agenda>Agendas - {agendas.length}</Agenda>
						<Link to="/set-meetings/meeting/preview" style={link}>
							<Button variant="contained" color="success">
								Preview
							</Button>
						</Link>
					</MainContent>

					<Form>
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
									let hold = [];
									for (const file of e.target.files) {
										hold.push(file);
									}
									setFiles(hold);
									setSelectedFiles(e.target.files);
								}}
							/>
							<UploadFileIcon />
						</IconButton>
					</Form>

					<AgendaList>
						<Button
							variant="contained"
							component="label"
							onClick={addnewAgenda}
							disabled={agenda.length > 0 ? false : true}
						>
							Add Agenda
						</Button>
					</AgendaList>

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
			</Container>
		</>
	);
};

export default AddMeeting;

const Container = styled.div`
	margin-right: 5%;
	margin-top: 2%;
`;

const MainContent = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 20px 0;
`;

const Form = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin: 20px 0;
`;
const link = {
	color: "white",
	textDecoration: "none",
};

const AgendaList = styled.div``;
const Agenda = styled.h3``;
