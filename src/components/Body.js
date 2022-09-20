import React, { useState } from "react";
import { useDataLayerValue } from "../reducer/DataLayer";


const Body = () => {
	const [{ token, user }, dispatch] = useDataLayerValue();
	return (
		<>
		</>
	);
};

export default Body;

