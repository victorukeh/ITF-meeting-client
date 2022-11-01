import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Back from "../components/Back";
import Time from "../components/Time";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import ReadMore from "../components/ReadMore";
import styled from "styled-components";
import Loading from "../components/Loading";
import { useDataLayerValue } from "../reducer/DataLayer";
const ViewComments = () => {
	const [{ loading, comments, user, viewMeeting }, dispatch] =
		useDataLayerValue();

	const deleteComment = (id, index, newState) => async () => {
		try {
			dispatch({
				type: "SET_LOADING",
				loading: true
			})
			const response = await axios.delete(
				`http://localhost:2000/api/v1/meeting/comment/delete?id=${id}`
			);
			const deleted = comments.filter((o, i) => index !== i);
			await dispatch({
				type: "SET_COMMENTS",
				comments: deleted,
			});
			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					notification: "Comment Deleted!",
					...newState,
				},
			});
			dispatch({
				type: "SET_LOADING",
				loading: false
			})
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
			if (err.response.status === 401) {
				window.localStorage.removeItem("token")
				window.location.reload(false)
			}
		}
		const response = await axios.delete(
			`http://localhost:2000/api/v1/meeting/comment/delete?id=${id}`
		);
		const deleted = comments.filter((o, i) => index !== i);
		await dispatch({
			type: "SET_COMMENTS",
			comments: deleted,
		});
	};

	return (
		<>
			{!loading ? <div style={{ width: "100%", overflowY: "auto" }}>
				<Back to="/meetings/meeting" color="primary" />
				<div style={{ padding: 3, height: "78vh", width: "95%" }}>
					<h5>Comments</h5>
					{comments.map((comment, id) => {
						console.log(comment)
						return (
							<Paper style={{ padding: "5px 20px", marginTop: "10px" }} key={id}>
								<Grid container wrap="nowrap" spacing={2}>
									<Grid item xs zeroMinWidth>
										<div
											style={{
												display: "flex",
												flexDirection: "row",
												justifyContent: "space-between",
											}}
										>
											<div style={{ display: "flex", flexDirection: "column" }}><h4
												style={{
													margin: 0,
													textAlign: "left",
													textTransform: "uppercase",
												}}
											>
												{comment.fullName}
											</h4>
												<p style={{ fontSize: "13px", fontFamily: "cursive" }}>Agenda - {comment.agendaBody}</p></div>
											<Delete>
												<DeleteIcon
													className={(comment.user === user._id && viewMeeting.ended === false) ? "logoField" : "seize"}
													onClick={deleteComment(comment._id, id + 1, {
														vertical: "top",
														horizontal: "right",
													})}
												/>
											</Delete>
										</div>
										<h4 style={{ fontWeight: "lighter", textAlign: "left" }}>
											{comment.text.length > 124 ? (
												<ReadMore>{comment.text}</ReadMore>
											) : (
												<p>{comment.text}</p>
											)}
										</h4>
										<Time date={comment.createdAt} />
									</Grid>
								</Grid>
							</Paper>
						);
					})}
				</div>
			</div> : <Loader>
				<Loading type="spin" color="#7485e8" />
			</Loader>}
		</>

	);
};

export default ViewComments;

const Loader = styled.div`
width: 100%;
 height: 70vh; 
 display: flex;
  align-items: center;
flex-direction: column;
 justify-content: center
`

const Delete = styled.div`
	.logoField {
		color: #9fa1a3;
		cursor: pointer;
		margin-right: 21%;
	}
	&:hover {
		.logoField {
			color: #f2a5ac;
		}
	}

	.seize{
		color: brown;
		margin-right: 21%;
		pointer-events: none;
	}
`;
