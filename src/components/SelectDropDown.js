import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const SelectDropDown = ({ label, values, handleChange, value}) => {
	// const [age, setAge] = useState("");

	// const handleChange = (event) => {
	// 	setValue(event.target.value);
	// };
	return (
		<>
			<FormControl style={{ width: "50ch" }}>
				<InputLabel id="demo-simple-select-label">{label}</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={value}
					label={label}
					onChange={handleChange}
				>
					{values.map((value, id) => {
						return (
							<MenuItem key={id} value={value}>
								{value}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</>
	);
};

export default SelectDropDown;
