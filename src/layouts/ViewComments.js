import React, { useEffect, useState } from "react";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import Card from "../components/Card";
import Back from "../components/Back";
import Time from "../components/Time";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import ReadMore from "../components/ReadMore";
import styled from "styled-components";
import { useDataLayerValue } from "../reducer/DataLayer";
const ViewComments = () => {
	const [{ addMeeting, fullAgenda, notification, token, comments }, dispatch] =
		useDataLayerValue();

	const deleteComment = (id, index, newState) => async () => {
		try {
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
		<div style={{ width: "100%", overflowY: "auto" }}>
			<Back to="/meeting" color="primary"/>
			<div style={{ padding: 3, height: "78vh", width: "95%" }}>
				<h5>Comments</h5>
				{comments.map((comment, id) => {
					console.log(comment.text.length)
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
										<h4
											style={{
												margin: 0,
												textAlign: "left",
												textTransform: "uppercase",
											}}
										>
											{comment.fullName}
										</h4>
										<Delete>
											<DeleteIcon
												className="logoField"
												onClick={deleteComment(comment._id, id + 1, {
													vertical: "top",
													horizontal: "right",
												})}
											/>
										</Delete>
									</div>
									<h4 style={{ fontWeight: "lighter", textAlign: "left" }}>
										{comment.text.length > 124 ? <ReadMore>{comment.text}</ReadMore> : <p>{comment.text}</p>}
									</h4>
									<Time date={comment.createdAt} />
								</Grid>
							</Grid>
						</Paper>
					);
				})}
			</div>
		</div>
	);
};

export default ViewComments;

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
`;