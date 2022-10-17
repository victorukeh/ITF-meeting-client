import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import axios from "axios";

import { useDataLayerValue } from "../reducer/DataLayer";

const AddUser = () => {
	const [{ token, notification }, dispatch] = useDataLayerValue();
	const titles = ["Dr", "admin", "Mr", "Mrs", "Miss", "Prof"];
	const roles = ["admin", "user"];
	const [values, setValues] = useState({
		showPassword: false,
		password: "",
		email: "",
		name: "",
		country: "",
		position: "",
		department: "",
		role: "",
		title: "",
	});
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
					country: values.country,
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
		} catch (err) {
			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					error: true,
					notification: err.response.data.error,
					...newState,
				},
			});
		}
	};
	return (
		<>
			<Back color="primary" to="/users" />
			<div style={{ display: "flex", justifyContent: "center" }}>
				<h4 style={{ marginTop: "0px", marginBottom: "5px" }}>Create User</h4>
			</div>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div
					style={{ display: "flex", flexDirection: "row", borderRadius: "7px" }}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-around",
							flexDirection: "column",
							alignItems: "center",
							height: "50vh",
							width: "50%",
							flex: "0.5",
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
							style={{ width: "50ch" }}
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
							style={{ width: "50ch" }}
						/>
						<TextField
							id="search-bar"
							className="text"
							label="country"
							variant="outlined"
							placeholder="Country..."
							value={values.country}
							onChange={handleChange("country")}
							style={{ width: "50ch" }}
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
							width: "50%",
							flex: "0.5",
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
							style={{ width: "50ch" }}
						/>
						<SelectDropDown
							values={roles}
							label="role"
							value={values.role}
							handleChange={handleChange("role")}
						/>
						<TextField
							id="search-bar"
							className="text"
							label="department"
							variant="outlined"
							placeholder="department..."
							value={values.department}
							onChange={handleChange("department")}
							style={{ width: "50ch" }}
						/>
						<FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
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
				</div>
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
						values.country === "" ||
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
					<Link to={"/users"} style={{ textDecoration: "none", color: "white" }}>
						Create
					</Link>
				</Button>
				<Button
					variant="contained"
					color="warning"
					style={{ marginLeft: "2.7%", marginRight: "2.7%", marginTop: "1%" }}
				>
					Reset
				</Button>
			</div>
		</>
	);
};

export default AddUser;
