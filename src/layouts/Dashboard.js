import React, { useState } from "react";
import styled from "styled-components";
import Calender from "../components/Calender";
import Header from "../components/Header";
import Meeting from "../components/Meeting";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useDataLayerValue } from "../reducer/DataLayer";
const Dashboard = () => {
  const [{ token, user }, dispatch] = useDataLayerValue();
  const content = [
    {
      title: "Meeting Board Room 12:30pm",
      description: "description for Long Event",
      start: "2022-09-12T16:00:00",
      end: "2022-09-12T18:00:00",
    },
    {
      title: "Emmanuel's Birthday",
      description: "THe annoying Guy has his birthday today",
      start: "2022-09-28",
      end: "2022-09-28",
    },
  ];

  const handleMouseEnter = (arg) => {
    tippy(arg.el, {
      content: `<strong>${arg.event._def.title}</strong>
			<p>${arg.event._def.extendedProps.description}</p>`,
      allowHTML: true,
    });
  };
  return (
    <BodyContent>
      <Meeting />
      <Calender content={content} handleMouseEnter={handleMouseEnter} />
    </BodyContent>
  );
};

export default Dashboard;

const Container = styled.div`
  flex: 0.8;
  background-color: white;
  display: flex;
  flex-direction: row;
`;

const MainContent = styled.div`
  padding-left: 5%;
  width: 100%;
  height: 15%;
  /* background: white; */
`;

const BodyContent = styled.div`
  height: 83vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
