import React from 'react'
import styled from "styled-components";
const Pin = ({color, bg, Icon, onClick, pin}) => {
  return (
  <Container className = {!pin ? "ripple2" : "ripple3"} style={{backgroundColor: bg}} onClick={onClick}>
    <Icon style={{color: color}}/>
  </Container>
  )
}

export default Pin

const Container = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 1%;
`;