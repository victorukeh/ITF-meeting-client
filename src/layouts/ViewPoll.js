import React, { useState, Component } from "react";
import Poll from "../components/Poll"
import { LeafPoll, Result } from "react-leaf-polls";
// import Poll from "react-polls";
// import "react-leaf-polls/dist/index.css";

const ViewPoll = () => {
	// const pollQuestion = "Is react-polls useful?";
	// const values = [
	// 	{ option: "Yes", votes: 5 },
	// 	{ option: "No", votes: 2 },
	// ];
	// const { pollAnswers, setPollAnswers } = useState([...values]);
    
	// Handling user vote
	// Increments the votes count of answer when the user votes
	// const handleVote = (voteAnswer) => {
	// 	console.log("User voted!", pollAnswers);
	// 	const newPollAnswers = pollAnswers.map((answer) => {
	// 		if (answer.option === voteAnswer) answer.votes++;
	// 		return answer;
	// 	});
	// 	console.log("npA: ", newPollAnswers)
	// 	setPollAnswers(newPollAnswers);
	// 	// this.setState({
	// 	//   pollAnswers: newPollAnswers
	// 	// })
	// };
	return (
		<>
			<Poll/>
			{/* <Poll
				question={pollQuestion}
				answers={values}
				onVote={handleVote}
			/> */}
		</>
		// <div style={{display: "flex", justifyContent: "center", width: "100%", height: "100%"}}>
		// 	<div style={{ background: "red", width: "80%", height: "30vh", borderRadius: "5px", padding: "0px 3% 0px 3%" }}>
		//         <h4>How far?</h4>
		//     </div>
		// </div>
	);
};

export default ViewPoll;
