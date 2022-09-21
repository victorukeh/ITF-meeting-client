import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import DragAndDrop from "../components/DragAndDrop";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDataLayerValue } from "../reducer/DataLayer";
const AddAgenda = () => {
	const [{ addMeeting, fileList }, dispatch] = useDataLayerValue();
    const deleteFile = (index) => {
		const check = fileList.filter((o, i) => index !== i);
		dispatch({
			type: "ADD_FILE_TO_LIST",
			fileList: check,
		});
	};
	return (
		<>
			<div style={{marginLeft: "4%"}}>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<h3
						style={{
							fontWeight: "lighter",
							fontFamily: "Helvetica",
							marginBottom: "0%",
                            marginRight: "10%"
						}}
					>
						ADD AGENDA
					</h3>
					<Box sx={{ flexGrow: 1 }} style={{ width: "70%" }}>
						<Grid container spacing={2}>
							<Grid item xs={5}>
								<h3 style={{ color: "#0e2345" }}>Agenda Name: </h3>
							</Grid>
							<Grid item xs={7}>
								<TextField style={{ marginTop: "2%" }} fullWidth />
							</Grid>
						</Grid>
					</Box>
				</div>
				<div></div>
				<Box sx={{ flexGrow: 1 }} style={{ width: "70%", marginLeft: "2%" }}>
					<Grid container spacing={2}>
						<Grid item xs={8}>
							<DragAndDrop />
						</Grid>
						<Grid style={{ paddingTop: "4%" }} item xs={4}>
							<div
								style={{
									overflowY: "scroll",
									height: "42vh",
									width: "28vw",
								}}
							>
								<ol className="dropped-files">
									{fileList.map((f, id) => {
                                        console.log(fileList)
										return (
											<div
												key={id}
												style={{
													display: "flex",
													justifyContent: "space-between",
												}}
											>
												<li>{f.name}</li>
												<DeleteIcon
													style={{ cursor: "pointer", color: "grey" }}
													onClick={() => deleteFile(id)}
												/>
											</div>
										);
									})}
								</ol>
							</div>
							{/* <DragAndDrop /> */}
						</Grid>
					</Grid>
				</Box>
				<div
					style={{
						marginLeft: "2%",
						marginTop: "2%",
						width: "100%",
						justifyContent: "space-between",
					}}
				>
					<Button
						variant="contained"
						component="label"
						style={{ width: "90%" }}
					>
						Add Agenda
						{/* <input type="file" hidden /> */}
					</Button>
					<Button
						variant="contained"
						color="success"
						component="label"
						style={{ width: "90%", marginTop: "1%" }}
					>
						Submit
					</Button>
				</div>
			</div>
		</>
	);
};

export default AddAgenda;

const Container = styled.div`
	margin-right: 5%;
	margin-top: 5%;
`;
