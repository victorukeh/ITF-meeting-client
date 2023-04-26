import React from "react";
import styled from "styled-components";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";

import Navigation from "./Navigation";

import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";

const Header = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  console.log("User: ", user);
  const token = window.localStorage.getItem("token");
  const signOut = (newState) => async () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    await window.location.reload();
    await dispatch({
      type: "SET_SNACKBAR",
      snackbar: {
        open: true,
        notification: "You have logged out",
        ...newState,
      },
    });
  };
  return (
    <>
      <AppBar
        sx={{
          position: "static",
          background: "#026940",
          overflowY: "hidden",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: "5%",
          paddingBottom: "10px",
        }}
        style={{ marginTop: "0px" }}
      >
        {token && (
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <HeaderText>
                Welcome {user.title || null}. {user.fullName || null}
              </HeaderText>
              <HeaderParagraph>
                {user.position || null}, {user.department || null}
              </HeaderParagraph>
            </Typography>
          </Toolbar>
        )}
        <IconButton
          onClick={signOut({
            vertical: "top",
            horizontal: "right",
          })}
        >
          <LogoutIcon style={{ color: "#ffffff", fontSize: "40px" }} />
        </IconButton>
      </AppBar>
      <Line className="solid" />
    </>
  );
};

export default Header;

const HeaderText = styled.h3`
  font-family: "Segoe UI", Arial, sans-serif;
  color: white;
  font-family: Verdana;
  margin-bottom: 0%;
`;

const HeaderParagraph = styled.p`
  margin-bottom: 2%;
  font-size: 15px;
  font-family: Cambria;
`;

const Line = styled.hr`
  border-top: 1px solid #bbb;
  margin-left: 5%;
  margin-right: 5%;
`;
