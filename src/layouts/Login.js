import React, {useState} from "react";
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
import "../styles/css/login.css";

const Login = ({windowDimensions}) => {
  const [{ email, password, loading }, dispatch] = useDataLayerValue();
  // const [error, setError] = useState({
  //   status: false,
  //   message: ""
  // });
  // console.log("Error: ", error.status)
  const handleClick = async(event) => {
    event.preventDefault();
      const newState = ({
        vertical: "top",
        horizontal: "right",
      })
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
    // }

  
  };

  return (
    <>
      {!loading ? (
        <>
          {windowDimensions.width > 1000 && (
            <LoginPage>
              <LoginForm>
                <LoginContainer>
                {/* {error && <FormHelperText>Please enter Username and Password</FormHelperText>} */}
                  <ItfLogo src={Logo} />
                  <HeaderText>Ukeh Meets</HeaderText>
                  <Greetings>Welcome back! Please enter your details</Greetings>
                  <Form onSubmit={handleClick}>
                    <LoginField Label="Username" Logo={AccountCircle} />
                    <LoginField Label="Password" Logo={LockIcon} />
                    <Button
                      style={{ marginTop: "10%", width: "100%" }}
                      className="button"
                      variant="contained"
                      color="success"
                      type="submit"
                    >
                      Login
                    </Button>
                  </Form>
                </LoginContainer>
              </LoginForm>
              <Background></Background>
            </LoginPage>
          )}
          :
          <Container>
            <LoginForm>
              <LoginContainer>
                <ItfLogo src={Logo} />
                <HeaderText>Ukeh Meets</HeaderText>
                <Greetings>Welcome back! Please enter your details</Greetings>
              
              </LoginContainer>
            </LoginForm>
          </Container>
        </>
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
  background-size: cover;
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

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


// <Form onSubmit={handleClick({
//   vertical: "top",
//   horizontal: "right",
// })}>
// <TextField
// variant="outlined"
// margin="normal"
// required
// fullWidth
// id="email"
// label="Email Address"
// name="email"
// autoComplete="email"
// autoFocus
// // value={email}
// // onChange={(event) => setEmail(event.target.value)}
// />
// <TextField
// variant="outlined"
// margin="normal"
// required
// fullWidth
// name="password"
// label="Password"
// type="password"
// id="password"
// autoComplete="current-password"
// // value={password}
// // onChange={(event) => setPassword(event.target.value)}
// />
// <FormControlLabel
// control={<Checkbox value="remember" color="primary" />}
// label="Remember me"
// />
// <Button
// type="submit"
// fullWidth
// variant="contained"
// color="primary"
// // className={classes.submit}
// >
// Sign In
// </Button>
// <Grid container>
// <Grid item xs>
//   <Link href="#" variant="body2">
//     Forgot password?
//   </Link>
// </Grid>
// <Grid item>
//   <Link href="#" variant="body2">
//     {"Don't have an account? Sign Up"}
//   </Link>
// </Grid>
// </Grid>
// {/* <LoginField Label="Username" Logo={AccountCircle} />
// <LoginField Label="Password" Logo={LockIcon} />
// <Button
// style={{ marginTop: "10%", width: "100%" }}
// onClick={handleClick({
//   vertical: "top",
//   horizontal: "right",
// })}
// className="button"
// variant="contained"
// color="success"
// >
// Login
// </Button> */}
// </Form>