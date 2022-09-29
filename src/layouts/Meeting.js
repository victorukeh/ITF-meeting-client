import React from "react";
import AddMeeting from "./AddMeeting"
import SetMeeting from "./SetMeeting"
import { useDataLayerValue } from "../reducer/DataLayer";

const Meeting = () => {
	const [{ meeting, fileList }, dispatch] = useDataLayerValue();
	return (
		<>
           {/* <AddMeeting/> */}
		   <SetMeeting/>
		</>
	);
};

export default Meeting;

