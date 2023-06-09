import React from 'react'
import {  BsPinAngleFill } from "react-icons/bs";
import styled from "styled-components";
const Pin = ({color, bg}) => {
  return (
    <Container className = "ripple2" style={{backgroundColor: bg}}>
    <BsPinAngleFill style={{color: color}}/>
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