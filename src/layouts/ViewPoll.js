import React, { useState, Component } from "react";
import { LeafPoll, Result } from "react-leaf-polls";
import Poll from "react-polls";
import "react-leaf-polls/dist/index.css";

const ViewPoll = () => {
	// const pollQuestion = "Is react-polls useful?";
	// const values = [
	// 	{ option: "Yes", votes: 8 },
	// 	{ option: "No", votes: 2 },
	// ];
	// const { pollAnswers, setPollAnswers } = useState([]);
    
	// Handling user vote
	// Increments the votes count of answer when the user votes
	// const handleVote = (voteAnswer) => {
	// 	console.log("User voted!", pollAnswers);
	// 	const newPollAnswers = pollAnswers.map((answer) => {
	// 		if (answer.option === voteAnswer) answer.votes++;
	// 		return answer;
	// 	});
	// 	setPollAnswers(newPollAnswers);
	// 	// this.setState({
	// 	//   pollAnswers: newPollAnswers
	// 	// })
	// };
	return (
		<div>
			{/* <Poll
				question={pollQuestion}
				answers={pollAnswers}
				onVote={handleVote}
			/> */}
		</div>
		// <div style={{display: "flex", justifyContent: "center", width: "100%", height: "100%"}}>
		// 	<div style={{ background: "red", width: "80%", height: "30vh", borderRadius: "5px", padding: "0px 3% 0px 3%" }}>
		//         <h4>How far?</h4>
		//     </div>
		// </div>
	);
};

export default ViewPoll;
