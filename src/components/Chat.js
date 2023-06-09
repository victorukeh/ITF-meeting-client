import React from "react";
import styled from "styled-components";
import Participant from "./items/Participant";
const Chat = () => {
  return (
    <Container>
      <Section1>
        <Participants>Participants</Participants>
        <Text>View All</Text>
      </Section1>
      <Section2>
        <Participant
          bg="#f5f5f5"
          name="Ukeh Victor "
          pic="https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        />
        <Participant
          bg="#ffffff"
          name="Karl Magnuson"
          pic="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
        />
        <Participant
          bg="#ffffff"
          name="Ayobami Prise Jackson"
          pic="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          useClass="blur"
        />
      </Section2>
      <Section1>
      <Participants>Chat</Participants>
        <Text>View All</Text>
      </Section1>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10%;
  padding-left: 5%;
  padding-right: 2%;
  /* background-color: beige; */
  width: 100%;
`;

const Section1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
  flex: 0.05;
`;

const Section2 = styled.div`
  display: flex;
  padding-top: 5%;
  /* justify-content: space-between;
    align-items: flex-end; */
  flex-direction: column;
  flex: 0.25;
`;

// const Section3 = styled.div`
//   display: flex;
//   padding-top: 5%;
//   background-color: red;
//   flex-direction: column;
//   flex: 0.25;
// `;

const Participants = styled.h2`
  font-weight: 500;
  margin-bottom: 0px;
  margin-top: 0px;
`;

const Text = styled.p`
  margin-bottom: 0px;
  margin-top: 0px;
  font-weight: 300;
  font-size: 14px;
  color: #c3cbd6;
  padding-right: 3%;
`;
