import React from "react";
import styled from "styled-components";
import { FiUsers } from "react-icons/fi";
// FiUsers
const MeetingType = () => {
  return (
    <Button>
      <FiUsers style={{paddingRight: "10%"}}/>
      Weekly
    </Button>
  );
};

export default MeetingType;

const Button = styled.div`
  padding-left: 3%;
  padding-right: 3%;
  border-radius: 30px;
  background-color: #3b85f7;
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
  font-size: 13px;
  width: 90px;
  color: #ffffff;
  margin-top: 2%;
`;
