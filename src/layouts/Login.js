import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import backgroundImage from "../styles/img/background.jpg";
import LoginField from "../components/LoginField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import Logo from "../styles/img/logo.png";
import Button from "@mui/material/Button";
import { useDataLayerValue } from "../reducer/DataLayer";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Notification } from "../components/Notification";

import Slide from "@mui/material/Slide";
import "../styles/css/login.css";

const Login = () => {
  const [{ email, password, user, token, snackbar, loading }, dispatch] =
    useDataLayerValue();
  const handleClick = (newState) => async () => {
    try {
      await dispatch({
        type: "SET_LOADING",
        loading: true,
      });
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/auth/login`,
        {
          email: email,
          password: password,
        }
      );
      window.localStorage.setItem("user", JSON.stringify(response.data.user));
      window.localStorage.setItem("token", JSON.stringify(response.data.token));
      await dispatch({
        type: "SET_TOKEN",
        token: response.data.token,
      });
      await dispatch({
        type: "SET_SNACKBAR",
        snackbar: {
          open: true,
          notification: "You are now logged in",
          ...newState,
        },
      });
      await dispatch({
        type: "SET_USER",
        user: response.data.user,
      });
      await dispatch({
        type: "SET_LOADING",
        loading: false,
      });
    } catch (err) {
      await dispatch({
        type: "SET_SNACKBAR",
        snackbar: {
          open: true,
          error: true,
          notification: err.response.data.error,
          ...newState,
        },
      });
    }
  };

  return (
    <>
      {!loading ? (
        <LoginPage>
          <LoginForm>
            <LoginContainer>
              <ItfLogo src={Logo} />
              <HeaderText>Ukeh Meets</HeaderText>
              <Greetings>Welcome back! Please enter your details</Greetings>
              <Form>
                <LoginField Label="Username" Logo={AccountCircle} />
                <LoginField Label="Password" Logo={LockIcon} />
                <Button
                  style={{ marginTop: "10%", width: "100%" }}
                  onClick={handleClick({
                    vertical: "top",
                    horizontal: "right",
                  })}
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
      ) : (
        <Loader>
          <Loading type="spin" color="#7485e8" />
        </Loader>
      )}
    </>
  );
};

export default Login;
const LoginPage = styled.div`
  display: flex;
`;
const LoginForm = styled.div`
  flex: 0.4;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Background = styled.div`
  background: url(${backgroundImage}) no-repeat;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  flex: 0.6;
`;

const ItfLogo = styled.img`
  // width: 15%;
  margin-top: 15%;
  height: 150px;
`;

const HeaderText = styled.h1`
  color: #011030;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom: 0px;
  text-transform: uppercase;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 10%;
`;

const Greetings = styled.p`
  font-family: Roboto;
  color: grey;
  font-size: 18px;
  padding-right: 35px;
`;

const Form = styled.form`
  // margin-right: 20%;
`;

const Loader = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
