import React, { useState } from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useDataLayerValue } from "../reducer/DataLayer";

const Body = () => {
	const [{ token, user }, dispatch] = useDataLayerValue();
	const [value, onChange] = useState(new Date());
	// const EventDetail = ({ event, el }) => {
	// 	const content = <div>{event.title}<div>{event.description}</div></div>;
	// 	ReactDOM.render(content, el);
	// 	return el;
	//   };
	const handleDateClick = (arg) => {
		// bind with an arrow function
		console.log(arg);
		alert(arg.date);
	};
	return (
		<div
			style={{
				flex: 0.8,
				backgroundColor: "white",
				display: "flex",
				flexDirection: "row",
				// background: "#ebe6e7"
			}}
		>
			<div
				style={{
					paddingLeft: "5%",
					width: "100%",
					height: "15%",
					background: "white",
				}}
			>
				<HeaderText style={{ fontFamily: "Verdana", marginBottom: "0%" }}>
					Welcome {user.email}
				</HeaderText>
				<p
					style={{
						marginBottom: "2%",
						fontSize: "15px",
						fontFamily: "Cambria",
					}}
				>
					{" "}
					Hello {user.firstName}, welcome back!
				</p>
				<hr
					class="solid"
					style={{ borderTop: "1px solid #bbb", marginRight: "5%" }}
				></hr>
				<div style={{ height: "83vh", display: "flex", flexDirection: "row" }}>
					<div style={{ flex: "0.5" }}></div>
					<div style={{ flex: "0.5", marginRight: "5%" }}>
						{/* <ReactTooltip id="registerTip" place="top" effect="solid"> */}
						<FullCalendar
							plugins={[dayGridPlugin, interactionPlugin]}
							initialView="dayGridMonth"
							dateClick={handleDateClick}
							eventColor="green"
							// height="650"
							events={[
								{
									title: "Long Event",
									description: "description for Long Event",
									start: "2022-09-12T16:00:00",
									end: "2022-09-12T18:00:00",
								},
								{ title: "event 2", date: "2022-09-20" },
							]}
							// eventRender={EventDetail}
						/>
						{/* </ReactTooltip> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Body;

const HeaderText = styled.h3`
	font-family: "Segoe UI", Arial, sans-serif;
	color: #b03f58;
`;
