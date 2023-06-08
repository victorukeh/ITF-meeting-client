import React from "react";
import styled from "styled-components";
import Calender from "../components/Calender";
import Meeting from "../components/Meeting";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useDataLayerValue } from "../reducer/DataLayer";
const Dashboard = () => {
	const [{ meetings }] = useDataLayerValue();


	const handleMouseEnter = (arg) => {
		tippy(arg.el, {
			content: `<strong>${arg.event._def.title}</strong>
			<p>${arg.event._def.extendedProps.description}</p>`,
			allowHTML: true,
		});
	};
	return (
		<BodyContent>
			<Meeting />
			<Calender content={meetings} handleMouseEnter={handleMouseEnter} />
		</BodyContent>

	);
};

export default Dashboard;

const BodyContent = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-left: 2%;
	margin-right: 2%;
	padding-left: 4%;
	padding-right: 4%;
	padding-bottom: 5%;
	padding-top: 4%;
	background-color: #fff;
	border-radius: 8px;
`;
