import React from "react";
import styled from "styled-components";
import Participant from "./items/Participant";
import Message from "./items/Message";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { MdSend } from "react-icons/md";
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
      <Section3>
        <Message
          pic="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          nam="cas"
        />
        <Message
          pic="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          nam="cas"
        />
        <Message
          pic="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          nam="cas"
        />
      </Section3>
      <Section4>
        <MessageIcon className="ripple__chat__one">
          <BsFillEmojiSmileFill style={{ fontSize: "20px" }} />
        </MessageIcon>

        <Input type="text" placeholder="Send a message..." />
        <SendIcon className="ripple__chat__two">
          <MdSend />
        </SendIcon>
      </Section4>
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

const Section3 = styled.div`
  padding-top: 3%;
  display: flex;
  flex-direction: column;
  flex: 0.58;
  overflow-y: scroll;
`;

const Section4 = styled.div`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: row;
  padding-top: 3%;
  padding-bottom: 3%;
  margin-top: 3%;
  margin-bottom: 1%;
  padding-left: 3%;
  padding-right: 3%;
  border-radius: 50px;
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

const MessageIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 1%;
  background-color: #feae4f;
  color: #ffffff;
  cursor: pointer;
`;

const SendIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #34ac96;
  color: #ffffff;
  cursor: pointer;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background-color: #f5f5f5;
  outline: none;
`;
