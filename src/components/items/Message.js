import React from "react";
import styled from "styled-components";

const Message = ({ pic, name }) => {
  return (
    <Container>
      <Profile src={pic} alt={name} />
      <Section>
        <Name>John Jones</Name>
        <Text>Hey, I am good. What about you? Hey, I am good. What about you?Hey, I am good. What about you?</Text>
        <Time>09:31</Time>
      </Section>
    </Container>
  );
};

export default Message;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 2%;
  padding-bottom: 2%;
`;

const Profile = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: red; */
  flex: 0.9;
  margin-left: 4%;
  justify-content: center;
`;
const Text = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 10px;
`;

const Name = styled.h4`
 margin-top: 0px;
  margin-bottom: 0px;
  font-weight: 500;
  font-size: 14px;
  color: #888888;
`

const Time = styled.p`
  margin-top: 5px;
  margin-bottom: 0px;
  font-size: 8px;
  margin-left: 95%;
  color: #acb0b7;
`