import React, { useEffect, useState } from "react";
import PollButton from "./PollButton";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import Time from "./Time";
import Back from "./Back";
import { useDataLayerValue } from "../reducer/DataLayer";
import axios from "axios";
const Poll = () => {
	const [{ poll, options, user, token }, dispatch] = useDataLayerValue();
	const [sumValue, setSumValue] = useState(0);
	console.log(sumValue);
	const [active, setActive] = useState({
		id: "",
		option: null,
		isActive: false,
	});

	useEffect(() => {
		let value = 0;
		for (const option of options) {
			value = option.votes + value;
		}
		setSumValue(value);
	}, []);

	useEffect(() => {
		let value = 0;
		for (const option of options) {
			value = option.votes + value;
		}
		setSumValue(value);
		setActive({
			id: "",
			option: null,
			isActive: false,
		});
	}, [options]);

	const onClickHandler = (id, index) => {
		setActive({
			id: id,
			option: index,
			isActive: !active.isActive,
		});
	};

	const submitVote = (newState) => async () => {
		const response = await axios.put(
			`http://localhost:2000/api/v1/meeting/poll/vote?option=${active.option}`,
			{},
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		try {
			if (response.data.success === false) {
				await dispatch({
					type: "SET_SNACKBAR",
					snackbar: {
						open: true,
						notification: "Something went wrong",
						...newState,
					},
				});
			} else {
				const option = await axios.get(
					`http://localhost:2000/api/v1/meeting/options?poll=${response.data.vote.poll}`
				);
				console.log(option.data.options);
				await dispatch({
					type: "SET_OPTIONS",
					options: option.data.options,
				});
				await dispatch({
					type: "SET_SNACKBAR",
					snackbar: {
						open: true,
						notification: "Vote is locked in",
						...newState,
					},
				});
			}
		} catch (err) {
			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					notification: "Something went wrong",
					...newState,
				},
			});
		}
	};
	return (
		<>
			<Back to="/polls" color="primary"/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<h2 style={{ marginBottom: "0px" }}>{poll.question}</h2>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<p style={{ color: "gray" }}>
						Asked by admin about<span style={{ color: "white" }}>.</span>
					</p>
					<Time date={poll.createdAt} />
				</div>

				<Grid
					container
					spacing={3}
					alignItems="flex-end"
					style={{ marginRight: "0px" }}
				>
					<Grid item xs={8}>
						<div
							style={{
								width: "100%",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								height: "60vh",
								overflowY: "auto",
							}}
						>
							{options.map((option, id) => (
								<PollButton
									sumValue={sumValue}
									option={option}
									key={id}
									onClickHandler={() => onClickHandler(id, option._id)}
									color={
										user.role === "user" &&
										active.isActive === true &&
										active.id === id &&
										active.option !== null
											? "2px solid #b20505"
											: "2px solid whitesmoke"
									}
								/>
							))}
						</div>
					</Grid>
					<Grid item xs={4}>
						<div
							style={{
								marginTop: "-125%",
								width: "100%",
								display: "flex",
								flexDirection: "column",
							}}
						>
							{user.role === "user" && (
								<Button
									onClick={submitVote({
										vertical: "top",
										horizontal: "right",
									})}
									variant="contained"
									color="success"
									fullWidth
								>
									Submit your Vote
								</Button>
							)}

							<div
								style={{
									border: "2px solid whitesmoke",
									borderRadius: "5px",
									width: "100%",
									height: "20vh",
									marginTop: "5%",
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<p
									style={{ marginTop: "5%", marginBottom: "0%", color: "gray" }}
								>
									Votes
								</p>
								<h1
									style={{
										marginTop: "0px",
										fontSize: "50px",
										fontFamily: "Open Sans",
									}}
								>
									{sumValue}
								</h1>
							</div>
						</div>
					</Grid>
				</Grid>
			</div>
		</>
	);
};

export default Poll;
