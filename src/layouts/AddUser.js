import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Back from "../components/Back";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SelectDropDown from "../components/SelectDropDown";
import { redirect } from "react-router-dom";
import axios from "axios";
import "../styles/css/link.css";

import { useDataLayerValue } from "../reducer/DataLayer";

const AddUser = () => {
	const [{ token, notification }, dispatch] = useDataLayerValue();
	const titles = ["Dr", "admin", "Mr", "Mrs", "Miss", "Prof"];
	const roles = ["admin", "user", "representative"];
	const departments = ["Directorate", "Admin & Human Resource", "Finance & Account", "Information & Communication Technology", "Business Training Development", "Field Services", "Revenue Inspectorate & Compliance", "Technical Vocational Skills & Training", "Procurement", "Research & Curriculum Development Department", "Corporate Planning", "Internal Audit", "Public Affairs", "Legal and Council Affairs", "Standardization, Certification and Consultancy"]
	const [availableUsers, setAvailableUsers] = useState([])
	const [values, setValues] = useState({
		showPassword: false,
		password: "",
		email: "",
		name: "",
		representing: "",
		position: "",
		department: "",
		role: "",
		title: "",
	});
	useEffect(() => {
		getUsers();
	}, []);
	const getUsers = async () => {
		const response = await axios.get("http://localhost:2000/api/v1/users", {
			headers: { Authorization: `Bearer ${token}` },
		});
		let users = []
		for (const user of response.data.users) {
			users.push(user.fullName)
		}
		setAvailableUsers(users)
	};
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};
	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const createUser = (newState) => async () => {
		try {
			const response = await axios.post(
				"http://localhost:2000/api/v1/auth/signUp",
				{
					password: values.password,
					email: values.email,
					fullName: values.name,
					representing: values.representing,
					position: values.position,
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
					notification: "User Created Successfully",
					...newState,
				},
			});
			return redirect("/users");
		} catch (err) {
			console.log(err)
			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					error: true,
					notification: err.response.data.error,
					...newState,
				},
			});
			if (err.response.status === 401) {
				window.localStorage.removeItem("token")
				window.location.reload(false)
			}
		}
	};
	return (
		<>
			<Back color="primary" to="/users" />
			<div style={{ display: "flex", justifyContent: "center" }}>
				<h4 style={{ marginTop: "0px", marginBottom: "5px" }}>Create User</h4>
			</div>
			{/* <div style={{ display: "flex", flexDirection: "column" }}> */}
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					borderRadius: "7px",
					flexWrap: "wrap",
					overflowY: "auto",
					height: "56vh",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-around",
						flexDirection: "column",
						alignItems: "center",
						height: "50vh",
						width: "28ch",
						fontSize: "30px",
					}}
				>
					<TextField
						id="search-bar"
						className="text"
						label="full name"
						variant="outlined"
						placeholder="Name..."
						value={values.name}
						onChange={handleChange("name")}
						style={{ width: "25ch" }}
						required
					/>
					<TextField
						id="search-bar"
						className="text"
						label="email"
						variant="outlined"
						placeholder="Email..."
						value={values.email}
						onChange={handleChange("email")}
						style={{ width: "25ch" }}
					/>
					<SelectDropDown
						values={roles}
						label="role"
						value={values.role}
						handleChange={handleChange("role")}
					/>
					<SelectDropDown
						values={titles}
						label="title"
						value={values.title}
						handleChange={handleChange("title")}
					/>
				</div>

				<div
					style={{
						display: "flex",
						justifyContent: "space-around",
						flexDirection: "column",
						alignItems: "center",
						height: "50vh",
						width: "28ch",
						fontSize: "30px",
					}}
				>
					<TextField
						id="search-bar"
						className="text"
						label="position"
						variant="outlined"
						placeholder="Position..."
						value={values.position}
						onChange={handleChange("position")}
						style={{ width: "25ch" }}
					/>
					{values.role === "representative" && <SelectDropDown
						values={availableUsers || ""}
						label="representing"
						value={values.representing || ""}
						handleChange={handleChange("representing")}
					/>}
					<SelectDropDown
						values={departments}
						label="department"
						value={values.department}
						handleChange={handleChange("department")}
					/>
					<FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">
							Password
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={values.showPassword ? "text" : "password"}
							value={values.password}
							onChange={handleChange("password")}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{values.showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
						/>
					</FormControl>
				</div>
				{/* </div> */}
			</div>
			<div style={{ width: "100%" }}>
				{/* <Link
					to="/users"
					className={
						values.name === "" ||
							values.title === "" ||
							values.email === "" ||
							// values.representing === "" ||
							values.positon === "" ||
							values.role === "" ||
							values.department === "" ||
							values.password === ""
							? "seize"
							: "normal"
					}
				> */}
				<Button
					variant="contained"
					color="success"
					style={{
						marginLeft: "2.7%",
						width: "94.5%",
						marginRight: "2.7%",
						marginTop: "2%",
					}}
					disabled={
						values.name === "" ||
							values.title === "" ||
							values.email === "" ||
							// values.representing === "" ||
							values.positon === "" ||
							values.role === "" ||
							values.department === "" ||
							values.password === ""
							? true
							: false
					}
					onClick={createUser({
						vertical: "top",
						horizontal: "right",
					})}
				>
					Create
				</Button>
				{/* </Link> */}
				<Button
					variant="contained"
					color="warning"
					style={{
						marginLeft: "2.7%",
						width: "94.5%",
						marginRight: "2.7%",
						marginTop: "1%",
					}}
				>
					Reset
				</Button>
			</div>
		</>
	);
};

export default AddUser;
