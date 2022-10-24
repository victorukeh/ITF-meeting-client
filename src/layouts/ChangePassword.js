import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDataLayerValue } from "../reducer/DataLayer";
import styled from "styled-components";

const ChangePassword = () => {
	const [{ token }, dispatch] = useDataLayerValue();
	const [values, setValues] = useState({
		showPassword1: false,
		showPassword2: false,
		showPassword3: false,
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});
	const handleClickShowPassword1 = () => {
		setValues({
			...values,
			showPassword1: !values.showPassword1,
		});
	};

	const handleClickShowPassword2 = () => {
		setValues({
			...values,
			showPassword2: !values.showPassword2,
		});
	};

	const handleClickShowPassword3 = () => {
		setValues({
			...values,
			showPassword3: !values.showPassword3,
		});
	};
	const handleMouseDownPassword1 = (event) => {
		event.preventDefault();
	};

	const handleMouseDownPassword2 = (event) => {
		event.preventDefault();
	};
	const handleMouseDownPassword3 = (event) => {
		event.preventDefault();
	};
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const submit = (newState) => async () => {
		try {
			const response = await axios.put(
				"http://localhost:2000/api/v1/auth/change-password",
				{
					currentPassword: values.currentPassword,
					newPassword: values.newPassword,
					confirmNewPassword: values.confirmNewPassword,
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
					notification: response.data.message,
					...newState,
				},
			});
			setValues({
				showPassword1: false,
				showPassword2: false,
				showPassword3: false,
				currentPassword: "",
				newPassword: "",
				confirmNewPassword: "",
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
			<Container>
				<h4>Change Password</h4>
				<Form>
					<FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">
							Current Password
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={values.showPassword1 ? "text" : "password"}
							value={values.currentPassword}
							onChange={handleChange("currentPassword")}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword1}
										onMouseDown={handleMouseDownPassword1}
										edge="end"
									>
										{values.showPassword1 ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Current Password"
						/>
					</FormControl>
					<FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">
							New Password
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={values.showPassword2 ? "text" : "password"}
							value={values.newPassword}
							onChange={handleChange("newPassword")}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword2}
										onMouseDown={handleMouseDownPassword2}
										edge="end"
									>
										{values.showPassword2 ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="New Password"
						/>
					</FormControl>
					<FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">
							Confirm New Password
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={values.showPassword3 ? "text" : "password"}
							value={values.confirmNewPassword}
							onChange={handleChange("confirmNewPassword")}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword3}
										onMouseDown={handleMouseDownPassword3}
										edge="end"
									>
										{values.showPassword3 ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Confirm New Password"
						/>
					</FormControl>

					<Button
						variant="contained"
						onClick={submit({
							vertical: "top",
							horizontal: "right",
						})}
						style={{ width: "90%" }}
					>
						Update
					</Button>
				</Form>
			</Container>
		</>
	);
};

export default ChangePassword;

const Container = styled.div`
	width: 100%;
	height: 70vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Form = styled.div`
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	align-items: center;
	height: 75%;
	width: 50%;
	border-radius: 5px;
	box-shadow: 0 0 9px #b1b1b3;
	padding-bottom: 5px;
`;
