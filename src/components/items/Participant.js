import React from "react";
import styled from "styled-components";
import { BsFillMicMuteFill, BsFillCameraVideoFill } from "react-icons/bs";

const Participant = ({bg, name, pic, useClass}) => {
  return (
    <Container style={{backgroundColor: bg}} className={useClass}>
      <Profile
        src={pic}
        alt={name}
      />
      <Name>
        {name}
      </Name>
      <BsFillMicMuteFill style={{color: "#768393", cursor: "pointer"}}/>
      <BsFillCameraVideoFill style={{marginLeft: "5%", color: "#768393", cursor: "pointer"}}/>
    </Container>
  );
};

export default Participant;

const Container = styled.div`
  border-radius: 50px;
  padding-top: 2%;
  padding-bottom: 2%;
  display: flex;
  flex-direction: row;
  padding-left: 3%;
  align-items: center;
  margin-bottom: 3%;
`;

const Profile = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
`;

const Name= styled.p`
    margin-top: 0%;
    margin-bottom: 0%;
    margin-left: 3%;
    flex: 0.9;
    /* padding-right: 35%; */
`

const Blur = styled.div`
  height: 100px;
  overflow: hidden;
  & p {
    margin: 0;
    padding: 0;
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 50px;
    top: 1;
    background-color: green;
    /* background: linear-gradient(transparent, white); */
  }
`;
