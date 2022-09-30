import React, { useState } from "react";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../reducer/DataLayer";
import AddCommentIcon from "@material-ui/icons/AddComment";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DropDown from "../components/DropDown";
import axios from "axios";
import "../styles/css/dropDown.css";

const UserMeeting = () => {
	const [{ addMeeting, viewMeeting, notification, agendaAndDocs }, dispatch] =
		useDataLayerValue();
	const [addComment, setAddComment] = useState("");
	const [dropDown, setDropDown] = useState({
		id: "",
		isOpen: false,
	});
	const [comment, setComment] = useState({
		id: "",
		isOpen: false,
	});
	const onClickHandler = (id) => {
		setDropDown({
			id: id,
			isOpen: !dropDown.isOpen,
		});
	};

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

	const createComment = async (id, index) => {
		const response = await axios.post(
			`http://localhost:2000/api/v1/meeting/comment/add?meeting=${viewMeeting._id}&agenda=${id}`,
			{
				text: addComment,
			}
		);
		await commentHandler(index);
	};
	return (
		<Container>
			<MeetingBox>
				<MeetingText>{viewMeeting.title}</MeetingText>
			</MeetingBox>

			<MeetingView>
				{agendaAndDocs.map((f, id) => {
					console.log(f.docs)
					return (
						<AgendaView key={id}>
							<AgendaItems>
								<Agenda>
									{id + 1}. {f.agenda.name}
								</Agenda>
								<DropDown key={id} button="Documents" items={f.docs}/>
								{/* {dropDown.isOpen && dropDown.id === id ? (
									<ArrowDropDownIcon
										className="dropDownIcon"
										onClick={() => onClickHandler(id)}
									/>
								) : (
									<ArrowLeftIcon
										className="leftIcon"
										onClick={() => onClickHandler(id)}
									/>
								)} */}
							</AgendaItems>

							{/* {dropDown.isOpen && dropDown.id === id && (
										
								<List>
									<ListContent key={id}>
										{f.docs.map((item) => (
											<ListItem>{item.name}</ListItem>
										))}
									</ListContent>
								</List>
							)} */}
							<Comment onClick={() => commentHandler(id)}>
								<AddCommentIcon className="commentIcon" />
								<CommentText>Add Comment</CommentText>
							</Comment>
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
											onClick={() => createComment(f.agenda._id, id)}
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
								<Link style={{ textDecoration: "none" }} to="/meeting/comments">
									<Button variant="contained" color="success">
										View Comments
									</Button>
								</Link>

								<Link
									style={{ textDecoration: "none", marginLeft: "2%" }}
									to="/"
								>
									<Button variant="contained" color="error">
										Leave Meeting
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

export default UserMeeting;

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
	overflow-y: scroll;
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
