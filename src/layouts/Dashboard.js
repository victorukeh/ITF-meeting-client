import React, { useState } from "react";
import styled from "styled-components";
import Calender from "../components/Calender";
import Header from "../components/Header";
import Meeting from "../components/Meeting";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useDataLayerValue } from "../reducer/DataLayer";
const Dashboard = () => {
	const [{ token, user, meetings }, dispatch] = useDataLayerValue();
	const handleMouseEnter = (arg) => {
		tippy(arg.el, {
			content: `<strong>${arg.event._def.title}</strong>
			<p>${arg.event._def.extendedProps.description}</p>`,
			allowHTML: true,
		});
	};
	return (
		<BodyContent>
			<Meeting/>
			<Calender content={meetings} handleMouseEnter={handleMouseEnter} />
		</BodyContent>
	);
};

export default Dashboard;

const Container = styled.div`
	flex: 0.8;
	background-color: white;
	display: flex;
	flex-direction: row;
`;

const MainContent = styled.div`
	padding-left: 5%;
	width: 100%;
	height: 15%;
	/* background: white; */
`;

const BodyContent = styled.div`
	height: 83vh;
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
`;
