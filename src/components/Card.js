import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import styled from "styled-components";
import { useDataLayerValue } from "../reducer/DataLayer";

const Card = () => {
	const [{ user, notification }, dispatch] = useDataLayerValue();
	return (
		<Container>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<div style={{ marginLeft: "4%", flex: 0.9 }}>
					<h4 style={{ marginBottom: "0px", paddingTop: "1%", fontFamily: "Helvetica" }}>
						Mr John Dachin, ITF Director
					</h4>
					<p style={{ fontSize: "12px", marginTop: "0px", color: "#0e2345", fontFamily: "Arial" }}>
						Agenda - Don't make noise
					</p>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						flex: "0.15",
						paddingTop: "4.5%",
					}}
				>
					<EditIcon style={{ cursor: "pointer", color: "#948f09" }} />
					<DeleteIcon style={{ cursor: "pointer", color: "#82081e" }} />
				</div>
			</div>

			<div style={{ display: "flex", flexDirection: "row" }}>
				<ArrowForwardIcon style={{ flex: "0.1", paddingTop: "2.2%" }} />
				<div style={{ flex: "0.85", marginRight: "2%" }}>
					<p style={{ textAlign: "justify", color: "#333" }}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
						mollitia, molestiae quas vel sint commodi repudiandae consequuntur
						voluptatum laborum numquam blanditiis harum quisquam eius sed odit
						fugiat iusto fuga praesentium optio, eaque rerum! Provident
						similique accusantium nemo autem.
					</p>
				</div>
			</div>
		</Container>
	);
};

export default Card;

const Container = styled.div`
	// background: "pink",
	width: 80%;
	margin-left: 5%;
	border-radius: 5px;
	// color: "white"
	margin-bottom: 1%;
	-moz-box-shadow: 0 0 3px #ccc;
	-webkit-box-shadow: 0 0 3px #ccc;
	box-shadow: 0 0 3px #ccc;
`;
