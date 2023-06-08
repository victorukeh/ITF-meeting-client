import "./App.css";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import { useEffect, useState } from "react";
import { Notification } from "./components/Notification";
import { useDataLayerValue } from "./reducer/DataLayer";
function App() {
  const [{ snackbar, token }, dispatch] = useDataLayerValue();
  const hasWindow = typeof window !== "undefined";
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
console.log("Token: ", token)
  const { vertical, horizontal, open, notification } = snackbar;

  const handleClose = () => {
    dispatch({
      type: "SET_SNACKBAR",
      snackbar: { ...snackbar, open: false },
    });
  };

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
	console.log(width, height)
    return {
      width,
      height,
    };
  }

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
		setWindowDimensions(getWindowDimensions());
        dispatch({
          type: "SET_WINDOW",
          windowDimensions: getWindowDimensions(),
        });
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        dispatch({
          type: "SET_WINDOW",
          windowDimensions: getWindowDimensions(),
        });
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  const checkToken = JSON.stringify(token)
  return (
    <div className="app">
      {token && checkToken.length > 10 ? <Main /> : <Login windowDimensions={windowDimensions}/>}
      <Notification
        vertical={vertical}
        horizontal={horizontal}
        open={open}
        color={snackbar.error ? "red" : "green"}
        handleClose={handleClose}
        message={notification}
      />
    </div>
  );
}

export default App;
