import React from "react";
import { FaMicrophone } from "react-icons/fa";
import styled from "styled-components";

const Microphone = ({color, bg}) => {
  return (
    <Container className = "ripple" style={{backgroundColor: bg}}>
      <FaMicrophone style={{color: color}}/>
    </Container>
  );
};

export default Microphone;

const Container = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;
