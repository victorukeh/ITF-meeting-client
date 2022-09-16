import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import backgroundImage from "../styles/img/check.jpg";
import LoginField from "../components/LoginField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import Logo from "../styles/img/itf-logo.jpg";
import Button from "@mui/material/Button";
import { useDataLayerValue } from "../reducer/DataLayer";
import "../styles/css/login.css";

const Login = () => {
	const [{ email, password,user }, dispatch] = useDataLayerValue();
	const handleSubmit = async () => {
		const response = await axios.post(
			"http://localhost:2000/api/v1/auth/login",
			{
				email: email,
				password: password,
			}
		);
		await dispatch({
			type: "SET_TOKEN",
			token: response.data.token,
		});
		await dispatch({
			type: "SET_USER",
			user: response.data.user
		})
	};
	return (
		<>
			<LoginPage>
				<LoginForm>
					<ItfLogo src={Logo} />
					<LoginContainer>
						<HeaderText>ITF Management Meeting</HeaderText>
						<Greetings>Welcome back! Please enter your details</Greetings>
						<Form>
							<LoginField Label="Username" Logo={AccountCircle} />
							<LoginField Label="Password" Logo={LockIcon} />
							<Button
								style={{ marginTop: "10%", width: "77%" }}
								onClick={handleSubmit}
								className="button"
								variant="contained"
								color="success"
							>
								Login
							</Button>
						</Form>
					</LoginContainer>
				</LoginForm>
				<Background>
					{/* <Info> */}
					{/* <h2 style={{ paddingTop: "5%", color: "white", fontFamily: "sans-serif", paddingLeft: "3%", fontSize: "1.2rem"}}>
							Topic:    sldjaoidjpasiodkaposdkaodk
						</h2>
                        */}
					{/* </Info> */}
				</Background>
			</LoginPage>
		</>
	);
};

export default Login;
const LoginPage = styled.div`
	display: flex;
`;
const LoginForm = styled.div`
	flex: 0.4;
`;
const Background = styled.div`
	background: url(${backgroundImage}) no-repeat;
	background-size: cover;
	height: 100vh;
	flex: 0.6;
`;

const Info = styled.div`
	width: 50%;
	height: 40%;
	margin-top: 57vh;
	margin-left: 48%;
	background-image: linear-gradient(
		to bottom right,
		rgba(255, 255, 255, 0.2),
		rgba(255, 255, 255, 0)
	);
	box-shadow: 10px 10px 10px rgba(30, 30, 30, 0.5);
	backdrop-filter: blur(10px);
	border-radius: 4px;
`;
const ItfLogo = styled.img`
	width: 15%;
	margin-left: 38%;
	margin-top: 15%;
`;

const HeaderText = styled.h1`
	color: #011030;
	font-family: Open Sans;
	margin-bottom: 0px;
`;

const LoginContainer = styled.div`
	margin-top: 3%;
	margin-left: 20%;
`;

const Greetings = styled.p`
	font-family: Roboto;
	color: grey;
`;

const Form = styled.form`
	margin-right: 20%;
`;
