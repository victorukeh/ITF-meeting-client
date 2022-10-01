import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useDataLayerValue } from "../reducer/DataLayer";
const ViewComments = () => {
	const [{ addMeeting, fullAgenda, notification, token, comments }, dispatch] =
		useDataLayerValue();

	const deleteComment = async (id, index) => {
    const response = await axios.delete(`http://localhost:2000/api/v1/meeting/comment/delete?id=${id}`)
		const deleted = comments.filter((o, i) => index !== i);
		await dispatch({
			type: "SET_COMMENTS",
			comments: deleted,
		});
	};
	return (
		<div style={{ overflowY: "auto", height: "83vh" }}>
			{comments.map((comment, id) => {
				return (
					<div key={id}>
						<Card comment={comment.text} agenda={comment.agendaBody} deleteFunc={() => deleteComment(comment._id, id)}/>
					</div>
				);
			})}
		</div>
	);
};

export default ViewComments;
