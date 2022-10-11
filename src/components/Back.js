import React from "react";
import { Button } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const Back = ({to, color}) => {
	return (
		<Link style={{ textDecoration: "none"}} to={to}>
			<Button
				variant="text"
				color={color}
				style={{ height: "6px", marginTop: "1%", fontSize: "12px" }}
			>
				<ArrowBackIcon style={{ fontSize: "15px", marginTop: "-5%" }} /> Back
			</Button>
		</Link>
	);
};

export default Back;
