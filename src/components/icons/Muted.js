import React from "react";
import { BsFillMicMuteFill } from "react-icons/bs";
import styled from "styled-components";
const Muted = ({color, bg}) => {
  return (
    <Container className = "ripple__muted" style={{backgroundColor: bg}}>
      <BsFillMicMuteFill style={{color: color}}/>
    </Container>
  )
}

export default Muted

const Container = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;
