import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../reducer/DataLayer";
import AddCommentIcon from "@material-ui/icons/AddComment";
import TextField from "@mui/material/TextField";
import Loading from "../components/Loading";
import Box from "@mui/material/Box";
import DropDown from "../components/DropDown";
import axios from "axios";
import "../styles/css/dropDown.css";

const UserMeeting = () => {
	const [
		{ loading, viewMeeting, agendaAndDocs, token, user },
		dispatch,
	] = useDataLayerValue();
	const [addComment, setAddComment] = useState("");
	const [comment, setComment] = useState({
		id: "",
		isOpen: false,
	});

	const handleComment = (event) => {
		setAddComment(event.target.value);
	};

	const commentHandler = (id) => {
		setAddComment("");
		setComment({
			id: id,
			isOpen: !comment.isOpen,
		});
	};

	const createComment = (id, index, newState) => async () => {
		try {
			const response = await axios.post(
				`http://localhost:2000/api/v1/meeting/comment/add?meeting=${viewMeeting._id}&agenda=${id}`,
				{
					text: addComment,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			await commentHandler(index);
			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					notification: response.data.message,
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

	const getPolls = async () => {
		try {
			const response = await axios.get(
				`http://localhost:2000/api/v1/meeting/poll-meet?meeting=${viewMeeting._id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			await dispatch({
				type: "SET_POLLSFORMEETING",
				pollsForMeeting: response.data.polls,
			});
		} catch (err) {
			if (err.response.status === 401) {
				window.localStorage.removeItem("token")
				window.location.reload(false)
			}
		}
	};

	const endMeeting = (newState) => async () => {
		try {
			const response = await axios.put(
				`http://localhost:2000/api/v1/meeting/end?id=${viewMeeting._id}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			await dispatch({
				type: "SET_VIEWMEETING",
				viewMeeting: response.data.meeting
			})
			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					notification: response.data.message,
					...newState,
				},
			});
		} catch (err) {
			if (err.response.status === 401) {
				window.localStorage.removeItem("token")
				window.location.reload(false)
			}
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
	}

	const getAdminComments = async () => {
		try {
			await dispatch({
				type: "SET_LOADING",
				loading: true
			})
			const response = await axios.get(
				`http://localhost:2000/api/v1/meeting/comments?meeting=${viewMeeting._id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			dispatch({ type: "SET_COMMENTS", comments: response.data.comments });

			window.localStorage.setItem(
				"comments",
				JSON.stringify(response.data.comments)
			);
			await dispatch({
				type: "SET_LOADING",
				loading: false
			})
		} catch (err) {
			if (err.response.status === 401) {
				window.localStorage.removeItem("token")
				window.location.reload(false)
			}
		}
	};
	const setMeeting = async () => {
		await dispatch({
			type: "SET_CHECKMEETING",
			checkMeeting: false,
		});
	};

	return (
		<>
			{!loading ? <Container>
				<MeetingBox>
					<MeetingText>{viewMeeting.title}</MeetingText>
					<MeetingParagraph>
						{viewMeeting.description}
					</MeetingParagraph>
				</MeetingBox>

				<MeetingView>
					{agendaAndDocs.map((f, id) => (
						<AgendaView key={id}>
							<AgendaItems>
								<Agenda>
									{id + 1}. {f.agenda.name}
								</Agenda>
								<DropDown button="Documents" items={f.docs} />
							</AgendaItems>
							{user.role === "user" && (
								<Comment onClick={() => commentHandler(id)}>
									<AddCommentIcon className="commentIcon" />
									<CommentText>Add Comment</CommentText>
								</Comment>
							)}
							{comment.isOpen && comment.id === id && (
								<Box
									component="form"
									sx={{
										"& .MuiTextField-root": { m: 1, width: "85%" },
									}}
									noValidate
									autoComplete="off"
								>
									<TextField
										id="outlined-multiline-static"
										label="Comment"
										multiline
										rows={4}
										value={addComment}
										onChange={handleComment}
									/>
									<div
										style={{
											display: "flex",
											flexDirection: "row",
											width: "86%",
											justifyContent: "space-between",
										}}
									>
										<Button
											variant="contained"
											color="primary"
											style={{ marginLeft: "58%", width: "20%" }}
											disabled={true && addComment.length === 0}
											onClick={createComment(f.agenda._id, id, {
												vertical: "top",
												horizontal: "right",
											})}
										>
											Submit
										</Button>
										<Button
											variant="contained"
											color="warning"
											style={{ width: "20%" }}
											onClick={() => commentHandler(id)}
										>
											Cancel
										</Button>
									</div>
								</Box>
							)}
							<ButtonBox>
								<Link
									style={{ textDecoration: "none" }}
									to="/meetings/meeting/comments"
								>
									<Button
										variant="contained"
										color="success"
										onClick={getAdminComments}
									>
										View Comments
									</Button>
								</Link>
								<Link
									style={{ textDecoration: "none", marginLeft: "2%" }}
									to="/meetings/meeting/vote"
									onClick={() => getPolls()}
								>
									{user.role === "admin" && (
										<Button variant="contained" color="primary">
											Add & View Polls
										</Button>
									)}
									{user.role === "user" && (
										<Button variant="contained" color="primary">
											View Polls
										</Button>
									)}
								</Link>
								{viewMeeting.ended === true && <Link
									style={{ textDecoration: "none", marginLeft: "2%" }}
									to="/meetings/meeting/minutes"
								>
									{user.role === "admin" && (
										<Button variant="contained" color="secondary">
											Add & View Minutes
										</Button>
									)}
									{user.role === "user" && (
										<Button variant="contained" color="secondary">
											View Minutes
										</Button>
									)}
								</Link>}
								{user.role === "admin" && viewMeeting.ended === false && <Button
									onClick={endMeeting({
										vertical: "top",
										horizontal: "right",
									})}
									style={{ marginLeft: "2%" }} variant="contained" color="warning">
									End Meeting
								</Button>}
								<Link
									style={{ textDecoration: "none", marginLeft: "2%" }}
									to="/"
									onClick={() => setMeeting()}
								>
									<Button variant="contained" color="error">
										Leave Meeting
									</Button>
								</Link>
							</ButtonBox>
						</AgendaView>
					))}
				</MeetingView>
			</Container> : <Loader>
				<Loading type="spin" color="#7485e8" />
			</Loader>}
		</>
	);
};

export default UserMeeting;

const Loader = styled.div`
width: 100%;
 height: 70vh; 
 display: flex;
  align-items: center;
flex-direction: column;
 justify-content: center;
`

const Container = styled.div`
	width: 80%;
	margin-left: 10%;
	margin-right: 10%;
	-moz-box-shadow: 0 0 3px #ccc;
	-webkit-box-shadow: 0 0 3px #ccc;
	box-shadow: 0 0 3px #ccc;
	height: 70vh;
	overflow-y: auto;
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
	flex-direction: column;
`;

const MeetingParagraph = styled.p`
	font-family: Verdana, sans-serif;
	margin-left: 5%;
	margin-right: 5% ;
	text-align: center;
	font-size: 14px;
	color: #333;
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

const Comment = styled.div`
	display: flex;
	flex-direction: row;
	margin-left: 3%;
	width: 17%;
	justify-content: space-around;
	cursor: pointer;
`;

const CommentText = styled.p`
	margin-top: 0px;
	font-size: 0.86rem;
	color: #bfe30e;
`;
// const Box = styled.div`
// 	width: 45%;
// 	-moz-box-shadow: 0 0 3px #ccc;
// 	-webkit-box-shadow: 0 0 3px #ccc;
// 	box-shadow: 0 0 3px #ccc;
// 	display: flex;
// 	justify-content: center;
// `;
