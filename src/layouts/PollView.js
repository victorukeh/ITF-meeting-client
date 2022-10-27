import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useDataLayerValue } from "../reducer/DataLayer";
import Back from "../components/Back";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import DeleteIcon from "@material-ui/icons/Delete";

const PollView = () => {
	const [{ token, viewMeeting }, dispatch] =
		useDataLayerValue();
	const [values, setValues] = useState({
		question: "",
	});
	const [arr, setArr] = useState([
		{
			value: "",
		},
	]);
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const addInput = () => {
		setArr((s) => {
			return [
				...s,
				{
					value: "",
				},
			];
		});
	};

	const handleChangeNew = (e) => {
		e.preventDefault();
		const index = e.target.id;
		setArr((s) => {
			const newArr = s.slice();
			newArr[index].value = e.target.value;

			return newArr;
		});
	};

	const deleteOption = (index) => {
		const deleted = arr.filter((o, i) => index !== i);
		setArr(deleted);
	};

	const createPoll = (newState) => async () => {
		try {
			const response = await axios.post(
				`http://localhost:2000/api/v1/meeting/polls/create-poll?meeting=${viewMeeting._id}`,
				{
					question: values.question,
					options: arr,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			console.log(response);
			await dispatch({
				type: "SET_POLL",
				poll: response.data.poll,
			});
			await dispatch({
				type: "SET_OPTIONS",
				options: response.data.options,
			});
			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					notification: "Poll created successfully",
					...newState,
				},
			});
		} catch (err) {
			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					error: true,
					notification: err.message,
					...newState,
				},
			});
		}
	};
	return (
		<div>
			<Back color="Primary" to="/meetings/meeting/vote" />
			<div
				style={{
					width: "100%",
					marginTop: "-4%",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<h4>Create Poll</h4>
			</div>
			<div>
				<FormControl fullWidth sx={{ m: 1 }}>
					<InputLabel htmlFor="outlined-adornment-amount">Question</InputLabel>
					<OutlinedInput
						id="outlined-adornment-amount"
						value={values.question}
						onChange={handleChange("question")}
						startAdornment={
							<InputAdornment position="start">
								<QuestionAnswerIcon />
							</InputAdornment>
						}
						label="Question"
					/>
				</FormControl>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-end",
					}}
				>
					<Button
						onClick={createPoll({
							vertical: "top",
							horizontal: "right",
						})}
						style={{ marginRight: "1%" }}
						variant="contained"
						color="success"
						disabled={arr.length < 2 || values.question === "" ? true : false}
					>
						<Link
							to="/polls/view"
							style={{ textDecoration: "none", color: "white" }}
						>
							Create Poll
						</Link>
					</Button>
					<Button onClick={addInput} color="primary" variant="contained">
						Option +
					</Button>
				</div>
				{arr.map((item, i) => {
					const number = `Option ${i + 1}`;
					return (
						<div key={i}>
							<Box
								sx={{
									display: "flex",
									alignItems: "flex-end",
									width: "98%",
									marginBottom: "1vh",
								}}
							>
								<RadioButtonUncheckedIcon
									sx={{ color: "action.active", mr: 1, my: 0.5 }}
								/>
								<TextField
									id={i}
									label={number}
									variant="standard"
									onChange={handleChangeNew}
									value={item.value}
									// type={item.type}
									fullWidth
								/>
								<IconButton>
									<DeleteIcon onClick={() => deleteOption(i)} />
								</IconButton>
							</Box>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default PollView;
