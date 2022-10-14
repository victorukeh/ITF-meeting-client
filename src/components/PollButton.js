import React, { useState } from "react";
import styled from "styled-components";

const PollButton = ({ option, sumValue, color, onClickHandler}) => {
	   
	var percent = 0
	if(sumValue !== 0){
		percent = Math.round((option.votes / sumValue)  * 100)
	}
	

	return (
		<Container
			onClick={onClickHandler}
			style={{ border: color}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<h3>{option.text}</h3>
				<h3> {percent}%</h3>
			</div>
			<div
				style={{
					borderRadius: "10px",
					background: "whitesmoke",
					width: "100%",
					height: "5px",
				}}
			>
				<div
					style={{
						borderRadius: "10px",
						width: `${percent}%`,
						height: "5px",
						background: "#b20505",
					}}
				></div>
			</div>
			<p style={{ color: "gray" }}>{option.votes} votes</p>
		</Container>
	);
};

export default PollButton;

const Container = styled.div`
	border: 2px solid whitesmoke;
	padding-left: 3%;
	padding-right: 3%;
	width: 80%;
	margin-bottom: 5px;
	cursor: pointer;
    border-radius: 5px;
	&:hover {
		border: 2px solid #b20505;
		box-shadow: 0 0 9px #b1b1b3;
	}
`;
