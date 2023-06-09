import React from 'react'
import styled from "styled-components";

const EndMeeting = () => {
  return (
    <Button>End Meeting</Button>
  )
}

export default EndMeeting

const Button = styled.button`
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: #f95a39;
  color: #ffffff;
  font-size: 20px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #fc8d65;
  }
`;
