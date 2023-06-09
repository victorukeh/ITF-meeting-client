import React from "react";
import styled from "styled-components";

const Microphone = ({ color, bg, onClick, Icon }) => {
  return (
    <Container className="ripple" style={{ backgroundColor: bg }} onClick={onClick}>
      <Icon style={{ color: color }}/>
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
