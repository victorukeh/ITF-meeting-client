import React from "react";
import styled from "styled-components";

const TrayIcon = ({ Icon, onClick }) => {
  return (
    <Container className="ripple__tray" onClick={onClick}>
      <Icon />
    </Container>
  );
};

export default TrayIcon;

const Container = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #ffffff;
  color: #676e7c;
  font-size: 20px;
  cursor: pointer;
`;
