import React from "react";
import Button from "@mui/material/Button";
import Back from "../components/Back";
import { Link } from "react-router-dom";
import axios from "axios"
import { useDataLayerValue } from "../reducer/DataLayer";

const ViewUser = () => {
	const [{ viewUser }, dispatch] = useDataLayerValue();
	const date = new Date(viewUser.createdAt).toUTCString();

	const deleteUser = (id, newState) => async () => {
		try {
			const response = await axios.delete(
				`http://localhost:2000/api/v1/users/delete?user=${id}`
			);

			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					notification: response.data.message,
					...newState,
				},
			});
		} catch (err) {
			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					error: true,
					notification: err.message,
					...newState,
				},
			});
		}
	};

	return (
		<>
			<Back color="primary" to="/users" />
			<div
				style={{
					width: "100%",
					height: "66vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div
					style={{
						marginTop: "10%",
						display: "flex",
						width: "75%",
						height: "100%",
						borderRadius: "3px",
						boxShadow: "0 0 9px #b1b1b3",
					}}
				>
					<div
						style={{
							flex: "0.3",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							background: "#b20505",
							color: "white",
							borderRadius: "3px"
						}}
					>
						<p style={{ fontFamily: "Open Sans" }}>NAME: </p>
						<p style={{ fontFamily: "Open Sans" }}>TITLE: </p>
						<p style={{ fontFamily: "Open Sans" }}>DEPARTMENT: </p>
						<p style={{ fontFamily: "Open Sans" }}>EMAIL: </p>
						<p style={{ fontFamily: "Open Sans" }}>ROLE: </p>
						{viewUser.representing.length > 1 && <p style={{ fontFamily: "Open Sans" }}>REPRESENTING: </p>}
						<p style={{ fontFamily: "Open Sans" }}>POSITION: </p>
						<p style={{ fontFamily: "Open Sans" }}>DATE CREATED: </p>
						{/* <p>Ukeh Victor Charles Aniche</p> */}
					</div>
					<div
						style={{
							flex: "0.7",
							paddingLeft: "3%",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<p style={{ fontFamily: "Roboto" }}>
							{viewUser.fullName}
						</p>
						<p style={{ fontFamily: "Roboto" }}>{viewUser.title}</p>
						<p style={{ fontFamily: "Roboto" }}>
							{viewUser.department}
						</p>
						<p style={{ fontFamily: "Roboto" }}>{viewUser.email}</p>
						<p style={{ fontFamily: "Roboto" }}>{viewUser.role}</p>
						{viewUser.representing.length > 1 && <p style={{ fontFamily: "Roboto" }}>{viewUser.representing}</p>}
						<p style={{ fontFamily: "Roboto" }}>{viewUser.position}</p>
						<p style={{ fontFamily: "Roboto" }}>{date}</p>

						<Link style={{ textDecoration: "none" }} to="/users"><Button
							variant="text"
							style={{ fontFamily: "Roboto", marginLeft: "75%" }}
							onClick={deleteUser(viewUser._id, {
								vertical: "top",
								horizontal: "right",
							})}
						>
							Delete
						</Button></Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewUser;
