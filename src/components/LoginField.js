import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useDataLayerValue } from '../reducer/DataLayer'

const LoginField = ({ Label, Logo }) => {
	const [{ email, password }, dispatch] = useDataLayerValue()
	const [showPassword, setShowPassword] = useState(false);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleChange = (event) => {
		dispatch({
			type: 'SET_PASSWORD',
			password: event.target.value
		  })
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleUsernameChange = (event) => {
		dispatch({
			type: 'SET_EMAIL',
			email: event.target.value
		  })
	}
	return (
		<>
			{/* className={classNames(classes.margin, classes.textField)} */}
			{Label === "Password" ? (
				<FormControl style={{ display: "flex", flexDirection: "row"}}>
					<Grid
						container
						spacing={3}
						alignItems="flex-end"
					>
						<Grid item>
							<Logo />
						</Grid>
						<Grid item>
							<InputLabel htmlFor="adornment-password" style={{marginLeft: "48px"}}>Password</InputLabel>
							<Input
								id="adornment-password"
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={handleChange}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="Toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</Grid>
					</Grid>
					<Logo style={{ flex: "0.2" }} />
				</FormControl>
			) : (
				<div style={{ marginRight: "0px", marginBottom: "10px"}}>
					<Grid
						container
						spacing={3}
						alignItems="flex-end"
						style={{ marginRight: "0px"}}
					>
						<Grid item>
							<Logo />
						</Grid>
						<Grid item style={{ width: "80%" }}>
							<TextField id="input-with-icon-grid" label={Label} onChange={handleUsernameChange} fullWidth/>
						</Grid>
					</Grid>
				</div>
			)}
		</>
	);
};
export default LoginField;
