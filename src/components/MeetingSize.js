import React from "react";
import styled from "styled-components";
import { FaUsers } from "react-icons/fa";

const MeetingSize = ({ size }) => {
  return (
    <Container>
      <FaUsers />
      <Text>{size}</Text>
    </Container>
  );
};

export default MeetingSize;

const Container = styled.div`
  padding-left: 2%;
  padding-right: 2%;
  border-radius: 30px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  height: 30px;
  /* width: 20px; */
  color: #333;
  margin-top: 2%;
  margin-left: 3%;
`;

const Text = styled.p`
    font-size: 12px;
    padding-left: 7%;
`;
