import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Back from "../components/Back";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDataLayerValue } from "../reducer/DataLayer";

const EditUser = () => {
	const [{ viewUser, token }, dispatch] = useDataLayerValue();
	const [values, setValues] = useState({
		email: "",
		name: "",
		position: "",
		department: "",
		role: "",
		title: "",
		password: "",
	});
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};
	const roles = ["admin", "user"];
	const titles = ["Dr", "admin", "Mr", "Mrs", "Miss", "Prof"];

	const editUser = (id, newState) => async () => {
		try {
			const response = await axios.put(
				`http://localhost:2000/api/v1/users/edit?user=${id}`,
				{
					email: values.email,
					fullName: values.name,
					position: values.position,
					password: values.password,
					department: values.department,
					role: values.role,
					title: values.title,
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
					notification: "User Updated Successfully",
					...newState,
				},
			});
		} catch (err) {
			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					error: true,
					notification: err.response.data.error || "Token expired. Login again",
					...newState,
				},
			});
			window.localStorage.removeItem("token");
		}
	};
	return (
		<>
			<Back color="primary" to="/users" />

			<div
				style={{
					width: "100%",
					marginTop: "-4%",
					display: "flex",
					justifyContent: "center",
					borderRadius: "3px 0px 0px 0px",
				}}
			>
				<h4>Edit User</h4>
			</div>
			<div style={{ height: "60vh", width: "100%" }}>
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
							<p style={{ fontFamily: "Open Sans" }}>NAME</p>
						</Grid>
						<Grid item xs={5}>
							<p style={{ fontFamily: "Roboto" }}>{viewUser.fullName}</p>
						</Grid>
						<Grid item xs={4}>
							<TextField
								id="standard-basic"
								label="Update Name"
								variant="standard"
								style={{ marginTop: "-4%" }}
								value={values.name}
								onChange={handleChange("name")}
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
							<p style={{ fontFamily: "Open Sans" }}>PASSWORD</p>
						</Grid>
						<Grid item xs={5}>
							<p style={{ fontFamily: "Roboto" }}>********</p>
						</Grid>
						<Grid item xs={4}>
							<TextField
								id="standard-basic"
								label="Change Password"
								variant="standard"
								style={{ marginTop: "-4%" }}
								value={values.description}
								onChange={handleChange("password")}
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
							<p style={{ fontFamily: "Open Sans" }}>DEPARTMENT </p>
						</Grid>
						<Grid item xs={5}>
							<p style={{ fontFamily: "Roboto" }}>{viewUser.department}</p>
						</Grid>
						<Grid item xs={4}>
							<TextField
								id="standard-basic"
								label="Update Department"
								variant="standard"
								style={{ marginTop: "-4%" }}
								value={values.department}
								onChange={handleChange("department")}
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
							<p style={{ fontFamily: "Open Sans" }}>POSITION </p>
						</Grid>
						<Grid item xs={5}>
							<p style={{ fontFamily: "Roboto" }}>{viewUser.position}</p>
						</Grid>
						<Grid item xs={4}>
							<TextField
								id="standard-basic"
								label="Update Position"
								variant="standard"
								style={{ marginTop: "-4%" }}
								value={values.position}
								onChange={handleChange("position")}
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
							<p style={{ fontFamily: "Open Sans" }}>EMAIL</p>
						</Grid>
						<Grid item xs={5}>
							<p style={{ fontFamily: "Roboto" }}>{viewUser.email}</p>
						</Grid>
						<Grid item xs={4}>
							<TextField
								id="standard-basic"
								label="Update Email"
								variant="standard"
								style={{ marginTop: "-4%" }}
								value={values.email}
								onChange={handleChange("email")}
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
							<p style={{ fontFamily: "Open Sans" }}>TITLE </p>
						</Grid>
						<Grid item xs={5}>
							<p style={{ fontFamily: "Roboto" }}>{viewUser.title}</p>
						</Grid>
						<Grid item xs={4}>
							<TextField
								id="filled-select-currency"
								select
								label="Update Title"
								value={values.title}
								onChange={handleChange("title")}
								style={{ marginTop: "-4%" }}
								variant="standard"
								fullWidth
							>
								{titles.map((option, id) => (
									<MenuItem key={id} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
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
								paddingBottom: "2.5%",
							}}
						>
							<p style={{ fontFamily: "Open Sans" }}>ROLE</p>
						</Grid>
						<Grid item xs={5}>
							<p style={{ fontFamily: "Roboto" }}>{viewUser.role}</p>
						</Grid>
						<Grid item xs={4}>
							<TextField
								id="filled-select-currency"
								select
								label="Update Role"
								value={values.role}
								onChange={handleChange("role")}
								style={{ marginTop: "-4%" }}
								variant="standard"
								fullWidth
							>
								{roles.map((option, id) => (
									<MenuItem key={id} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
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
								justifyContent: "flex-end",
							}}
						>
							<Link
								to="/users"
								style={{ textDecoration: "none", color: "blue", fontFamily: "Roboto"}}
							>
								<Button
									variant="text"
									onClick={editUser(viewUser._id, {
										vertical: "top",
										horizontal: "right",
									})}
								>
									Update
								</Button>
							</Link>
							<Button variant="text" style={{ fontFamily: "Roboto" }}>
								Cancel
							</Button>
						</Grid>
					</Grid>
				</div>
			</div>
		</>
	);
};

export default EditUser;
