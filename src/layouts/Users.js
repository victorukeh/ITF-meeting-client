import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import styled from "styled-components";
import axios from "axios";
import Button from "@mui/material/Button";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loading from "../components/Loading";
import { useDataLayerValue } from "../reducer/DataLayer";

function Users() {
	const [{ users, loading, token }, dispatch] = useDataLayerValue();
	const [searchQuery, setSearchQuery] = useState("");
	const [userTitles, setUserTitles] = useState([]);
	const [mappedUsers, setMappedUsers] = useState([]);

	const filterData = (query, data) => {
		if (!query) {
			return data;
		} else {
			return data.filter((d) => d.toLowerCase().includes(query));
		}
	};

	const dataFiltered = filterData(searchQuery, userTitles);
	useEffect(() => {
		getUsers();
	}, []);
	const getUsers = async () => {
		try {
			dispatch({
				type: "SET_LOADING",
				loading: true
			})
			const response = await axios.get("http://localhost:2000/api/v1/users", {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch({
				type: "SET_USERS",
				users: response.data.users,
			});
			setMappedUsers(response.data.users.slice(0, 4));
			let array = [];
			for (const user of response.data.users) {
				array.push(user.fullName);
			}
			setUserTitles(array);
			window.localStorage.setItem("users", JSON.stringify(response.data.users))
			dispatch({
				type: "SET_LOADING",
				loading: false
			})
		} catch (err) {
			if (err.response.status === 401) {
				window.localStorage.removeItem("token")
				window.location.reload(false)
			}
		}
	};

	const deleteUser = (id, index, newState) => async () => {
		try {
			const response = await axios.delete(
				`http://localhost:2000/api/v1/users/delete?user=${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			}
			);

			await dispatch({
				type: "SET_SNACKBAR",
				snackbar: {
					open: true,
					notification: response.data.message,
					...newState,
				},
			});

			const deleted = users.filter((o, i) => index !== i);
			await dispatch({
				type: "SET_USERS",
				users: deleted,
			});
			setMappedUsers(deleted);
			await getUsers();
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

	const setPageUsers = async (value) => {
		const last = value * 4;
		const first = last - 4;
		const result = users.slice(first, last);
		setMappedUsers(result);
	};

	const setUser = (user) => {
		dispatch({
			type: "VIEW_USER",
			viewUser: user
		})
		window.localStorage.setItem("viewUser", JSON.stringify(user));
	}

	const findUser = (user, newState) => async () => {
		try {
			const response = await axios.get(`http://localhost:2000/api/v1/users/find?name=${user}`)
			dispatch({
				type: "VIEW_USER",
				viewUser: response.data.user
			})
			window.localStorage.setItem("viewUser", JSON.stringify(response.data.user));
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
	}
	return (
		<>
			{!loading ? <>
				<div
					style={{
						width: "100%",
						display: "flex",
						alignItems: "flex-end",
						justifyContent: "flex-end",
						margin: "20px 0",
					}}
				>
					<Link style={{ textDecoration: "none" }} to="/users/create">
						<Button variant="contained">ADD USER</Button>
					</Link>
				</div>
				<div style={{ width: "80%", paddingLeft: "25%" }}>
					<div>
						<SearchBar
							title="Enter name of a user"
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
						/>
					</div>
					{searchQuery !== "" && userTitles.length > 0 && (
						<div
							style={{
								padding: 3,
								zIndex: "1000",
								position: "absolute",
								perspective: "100",
								background: "white",
								width: "33.3%",
								boxShadow: "0.2px 2px 8px 3px #dedfe0",
							}}
						>
							{dataFiltered.map((d) => (
								<Link style={{ textDecoration: "none" }} to="/users/view"
									onClick={findUser(d, {
										vertical: "top",
										horizontal: "right",
									})}>
									<div
										className="data__field"
										style={{
											padding: 5,
											fontSize: 15,
											margin: 1,
										}}
										key={d.id}>
										{d}
									</div>
								</Link>
							))}
						</div>
					)}
				</div>
				<TableContainer
					component={Paper}
					style={{
						paddingBottom: "0.4%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Title</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Position</TableCell>
								<TableCell>Department</TableCell>
								<TableCell align="right">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{mappedUsers.map((row, id) => {
								const date = new Date(row.start).toUTCString();
								return (
									<TableRow
										key={id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{row.title}
										</TableCell>
										<TableCell>{row.fullName}</TableCell>
										<TableCell>{row.email}</TableCell>
										<TableCell>{row.position}</TableCell>
										<TableCell>{row.department}</TableCell>
										<TableCell align="right">
											<Action>
												<Edit
												// onClick={() => getPoll(row._id)}
												>
													<Link
														style={{ textDecoration: "none" }}
														to="/users/view"
														onClick={() => setUser(row)}
													>
														<PreviewIcon className="logo" />
													</Link>
												</Edit>
												<Edit>
													<Link
														style={{ textDecoration: "none" }}
														to="/users/edit"
														onClick={() => setUser(row)}
													>
														<EditIcon className="logo" />
													</Link>
												</Edit>
												<Delete>
													<DeleteIcon
														className="logoField"
														onClick={deleteUser(row._id, id + 1, {
															vertical: "top",
															horizontal: "right",
														})}
													/>
												</Delete>
											</Action>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					<Stack spacing={2} style={{ marginTop: "0.4%" }}>
						<Pagination
							count={Math.ceil(users.length / 4)}
							color="primary"
							onChange={(e, value) => setPageUsers(value)}
						/>
					</Stack>
				</TableContainer>
			</> : <Loader>
				<Loading type="spin" color="#7485e8" />
			</Loader>}

		</>
	);
}

export default Users;

const Loader = styled.div`
	width: 100%;
 	height: 70vh; 
 	display: flex;
  	align-items: center;
	flex-direction: column;
 	justify-content: center
`

const Action = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
`;
const Delete = styled.div`
	.logoField {
		color: #9fa1a3;
		cursor: pointer;
		margin-right: 21%;
	}
	&:hover {
		.logoField {
			color: #f2a5ac;
		}
	}
`;

const Edit = styled.div`
	.logo {
		color: #9fa1a3;
		cursor: pointer;
	}
	&:hover {
		.logo {
			color: #f2a5ac;
		}
	}
`;
