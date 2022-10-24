import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Back from "../components/Back";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useDataLayerValue } from "../reducer/DataLayer";

const EditMeeting = () => {
	const [{ setMeeting, token }, dispatch] = useDataLayerValue();
	const [values, setValues] = useState({
		title: "",
		description: "",
		start: "",
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleChangeDate = (prop) => (event) => {
		const date = new Date(event.target.value).toISOString();
		setValues({ ...values, [prop]: date });
	};

	const start = new Date(setMeeting.start).toUTCString();

	const updateMeeting = (id, newState) => async () => {
		try {
			const response = await axios.put(
				`http://localhost:2000/api/v1/meeting/edit?meeting=${id}`,
				{
					title: values.title,
					description: values.description,
					start: values.start,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.data.success === false) {
				return dispatch({
					open: true,
					error: true,
					notification: response.data.message,
					...newState,
				});
			}
			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					notification: "Meeting Updated Successfully",
					...newState,
				},
			});
		} catch (err) {
			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					error: true,
					notification: "Token expired. Login again",
					...newState,
				},
			});
			window.localStorage.removeItem("token");
		}
	};
	const cancel = () => {
		setValues({
			title: "",
			description: "",
			start: "",
		});
	};
	return (
		<>
			<Back color="primary" to="/set-meetings/meeting/admin" />

			<div
				style={{
					width: "100%",
					marginTop: "-4%",
					display: "flex",
					justifyContent: "center",
					borderRadius: "3px 0px 0px 0px",
				}}
			>
				<h4>Edit Meeting</h4>
			</div>
			<div style={{ height: "265px", width: "100%" }}>
				<div
					style={{
						height: "100%",
						width: "100%",
						boxShadow: "0 0 9px #b1b1b3",
						borderRadius: "3px",
						marginTop: "2%",
						paddingBottom: "3%",
					}}
				>
					<Grid container spacing={2}>
						<Grid
							item
							xs={2}
							style={{
								background: "#b20505",
								marginLeft: "1.6%",
								// paddingLeft: "3%",
								borderRadius: "3px",
								color: "white",
								display: "flex",
								justifyContent: "center",
							}}
						>
							<p style={{ fontFamily: "Open Sans" }}>MEETING</p>
						</Grid>
						<Grid item xs={5}>
							<p style={{ fontFamily: "Roboto" }}>{setMeeting.title}</p>
						</Grid>
						<Grid item xs={4}>
							<TextField
								id="standard-basic"
								label="Update Meeting Name"
								variant="standard"
								style={{ marginTop: "-4%" }}
								value={values.title}
								onChange={handleChange("title")}
								fullWidth
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid
							item
							xs={2}
							style={{
								background: "#b20505",
								marginLeft: "1.6%",
								borderRadius: "3px",
								color: "white",
								display: "flex",
								justifyContent: "center",
							}}
						>
							<p style={{ fontFamily: "Open Sans" }}>DESCRIPTION </p>
						</Grid>
						<Grid item xs={5}>
							<p style={{ fontFamily: "Roboto" }}>{setMeeting.description}</p>
						</Grid>
						<Grid item xs={4}>
							<TextField
								id="standard-basic"
								label="Update Department"
								variant="standard"
								style={{ marginTop: "-4%" }}
								value={values.description}
								onChange={handleChange("description")}
								fullWidth
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid
							item
							xs={2}
							style={{
								background: "#b20505",
								marginLeft: "1.6%",
								borderRadius: "3px",
								color: "white",
								display: "flex",
								justifyContent: "center",
								paddingBottom: "93px",
								marginBottom: "0px",
								overflowY: "hidden",
							}}
						>
							<p style={{ fontFamily: "Open Sans" }}>DATE</p>
						</Grid>
						<Grid item xs={5}>
							<p style={{ fontFamily: "Roboto" }}>{start}</p>
						</Grid>
						<Grid item xs={4}>
							<TextField
								id="datetime-local"
								type="datetime-local"
								defaultValue={setMeeting.start.split(".")[0]}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={handleChangeDate("start")}
								variant="standard"
								fullWidth
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid
							item
							xs={2}
							style={{
								background: "#b20505",
								marginLeft: "1.6%",
								paddingLeft: "3%",
								borderRadius: "3px",
								color: "white",
								// paddingBottom: "3%"
							}}
						></Grid>
						<Grid item xs={5}></Grid>
						<Grid
							item
							xs={4}
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Link
								to="/set-meetings/meeting/admin"
								style={{
									textDecoration: "none",
									color: "blue",
									fontFamily: "Roboto",
									marginLeft: "61%",
								}}
							>
								<Button
									variant="text"
									onClick={updateMeeting(setMeeting._id, {
										vertical: "top",
										horizontal: "right",
									})}
								>
									Update
								</Button>
							</Link>
							<Button
								variant="text"
								style={{ fontFamily: "Roboto" }}
								onClick={() => cancel()}
							>
								Reset
							</Button>
						</Grid>
					</Grid>
				</div>
			</div>
		</>
	);
};

export default EditMeeting;
