import React from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
const Calender = ({content, handleMouseEnter}) => {
	return (
		<Container>
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				eventColor="green"
				events={content}
				eventMouseEnter={handleMouseEnter}
			/>
		</Container>
	);
};

export default Calender;

const Container = styled.div`
	flex: 0.5;
	/* margin-left: 3%; */
	margin-top: 2%;
`;
