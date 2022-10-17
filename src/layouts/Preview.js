import React, { useState } from "react";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../reducer/DataLayer";
import axios from "axios";

const Preview = () => {
	const [{ addMeeting, fullAgenda, notification }, dispatch] =
		useDataLayerValue();
	const [dropDown, setDropDown] = useState({
		id: "",
		isOpen: false,
	});
	const onClickHandler = (id) => {
		setDropDown({
			id: id,
			isOpen: !dropDown.isOpen,
		});
	};

	const createMeeting = (newState) => async () => {
		try {
			const response = await axios.post(
				"http://localhost:2000/api/v1/meeting/create-meeting",
				{
					title: addMeeting.title,
					description: addMeeting.description,
					start: addMeeting.start,
					end: addMeeting.end,
				}
			);
			if (response.data.success !== true) {
				await dispatch({
					type: "SET_NOTIFICATION",
					notification: "problems",
				});
			}

			if (response.data.success === true) {
				for (const item of fullAgenda) {
					const formData = new FormData();
					const agenda = await axios.post(
						`http://localhost:2000/api/v1/meeting/agenda/add?meeting=${response.data.meeting._id}`,
						{
							agenda: item.agenda,
						}
					);
					for (const doc of item.docs) {
						formData.append("files", doc);
					}
					const docs = await axios.post(
						`http://localhost:2000/api/v1/meeting/files?agenda=${agenda.data.agenda._id}&meeting=${response.data.meeting._id}`,
						formData
					);
				}
				await dispatch({
					type: "SET_SNACKBAR",
					snackbar: {
						open: true,
						notification: "Meeting Creeated Successfully",
						...newState,
					},
				});
				await dispatch({
					type: "SET_FULLAGENDA",
					fullAgenda: [],
				});
				await dispatch({
					type: "SET_ADDMEETING",
					addMeeting: "",
				});
			}
		} catch (err) {
			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					error: true,
					notification: "Something went wrong",
					...newState,
				},
			});
		}
	};

	const cancelMeeting = async () => {
		await dispatch({
			type: "SET_FULLAGENDA",
			fullAgenda: [],
		});
		await dispatch({
			type: "SET_ADDMEETING",
			addMeeting: "",
		});
	};
	return (
		<Container>
			<MeetingBox>
				<MeetingText>{addMeeting.title}</MeetingText>
			</MeetingBox>

			<MeetingView>
				{fullAgenda.map((f, id) => {
					console.log(f.docs.length);
					return (
						<AgendaView key={id}>
							<AgendaItems>
								<Agenda>
									{id + 1}. {f.agenda}
								</Agenda>
								{f.docs.length > 0 && (
									<div>
										{dropDown.isOpen && dropDown.id === id ? (
											<ArrowDropDownIcon
												style={{
													fontSize: "2.3rem",
													marginTop: "2%",
													cursor: "pointer",
												}}
												onClick={() => onClickHandler(id)}
											/>
										) : (
											<ArrowLeftIcon
												style={{
													fontSize: "2.3rem",
													marginTop: "2%",
													cursor: "pointer",
												}}
												onClick={() => onClickHandler(id)}
											/>
										)}
									</div>
								)}
							</AgendaItems>

							{dropDown.isOpen && dropDown.id === id && (
								<List>
									<ListContent>
										{f.docs.map((item) => (
											<ListItem key={item.name}>{item.name}</ListItem>
										))}
									</ListContent>
								</List>
							)}
							<ButtonBox>
								<Link style={{ textDecoration: "none" }} to="/">
									<Button
										variant="contained"
										color="success"
										onClick={createMeeting({
											vertical: "top",
											horizontal: "right",
										})}
									>
										Create
									</Button>
								</Link>
								<Link
									style={{
										textDecoration: "none",
										marginLeft: "2%",
										marginRight: "2%",
									}}
									to="/set-meetings/meeting/create"
								>
									<Button
										variant="contained"
										color="primary"
										onClick={cancelMeeting}
									>
										Restart
									</Button>
								</Link>
								<Link style={{ textDecoration: "none" }} to="/">
									<Button
										variant="contained"
										color="error"
										onClick={cancelMeeting}
									>
										Cancel
									</Button>
								</Link>
							</ButtonBox>
						</AgendaView>
					);
				})}
			</MeetingView>
		</Container>
	);
};

export default Preview;

const Container = styled.div`
	width: 80%;
	margin-left: 10%;
	margin-right: 10%;
	-moz-box-shadow: 0 0 3px #ccc;
	-webkit-box-shadow: 0 0 3px #ccc;
	box-shadow: 0 0 3px #ccc;
`;

const MeetingText = styled.div`
	margin-top: 2%;
	font-family: Helvetica;
	font-weight: bold;
`;

const MeetingBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const MeetingView = styled.div`
	margin-left: 5%;
	overflow-y: auto;
	height: 79vh;
`;

const AgendaView = styled.div`
	display: flex;
	flex-direction: column;
`;

const AgendaItems = styled.div`
	display: flex;
	justify-content: space-between;
	margin-right: 4%;
`;

const Agenda = styled.p`
	flex: 0.8;
	font-size: 1.1rem;
`;

const List = styled.ul``;

const ListContent = styled.div``;

const ListItem = styled.li``;

const ButtonBox = styled.div`
	background: white;
	position: fixed;
	height: 10%;
	width: 78.3%;
	bottom: 0;
	right: 0;
	border-top: 1px solid grey;
	display: flex;
	align-items: center;
	justify-content: center;
`;
