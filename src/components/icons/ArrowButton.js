import React from 'react'
import styled from "styled-components";
import {BsArrowLeft} from "react-icons/bs"

const ArrowButton = () => {
  return (
    <Button>
        <BsArrowLeft/>
    </Button>
  )
}

export default ArrowButton

const Button = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;