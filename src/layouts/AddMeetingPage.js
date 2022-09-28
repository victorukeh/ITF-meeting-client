import React from "react";
import AddMeeting from "./AddMeeting";
import AddAgenda from "./AddAgenda";
import Header from "../components/Header";
import { useDataLayerValue } from "../reducer/DataLayer";

const Meeting = () => {
  const [{ meeting, fileList }, dispatch] = useDataLayerValue();
  return (
    <>
      {meeting && <AddAgenda />}
      {!meeting && <AddMeeting />}
    </>
  );
};

export default Meeting;
