import React, { useState } from "react";
import styled from "styled-components";
import { useDataLayerValue } from "../reducer/DataLayer";
import { AiFillCaretDown, AiFillCaretLeft } from "react-icons/ai";

const Agenda = () => {
  const [{ agendaAndDocs }, dispatch] = useDataLayerValue();
  const [agenda, setAgenda] = useState({
    id: null,
    open: false,
  });
  return (
    <Container>
      <Header>Agenda</Header>
      {agendaAndDocs.map((f, id) => (
        <>
          <Agendum key={id}>
            <Text>
              {id + 1}. {f.agenda.name}
            </Text>
            {f.docs.length > 1 && (
              <>
                {agenda.id == id && agenda.open == true ? (
                  <AiFillCaretDown
                    className="agenda__icon"
                    onClick={() =>
                      setAgenda({
                        id: id,
                        open: !agenda.open,
                      })
                    }
                  />
                ) : (
                  <AiFillCaretLeft
                    className="agenda__icon"
                    onClick={() =>
                      setAgenda({
                        id: id,
                        open: !agenda.open,
                      })
                    }
                  />
                )}
              </>
            )}
          </Agendum>
          {agenda.id == id && agenda.open == true && (
            <>
              {f.docs.map((f, id) => (
                <Documents>
                  <Doc>List of fishes in the sea.pdf</Doc>
                </Documents>
              ))}
            </>
          )}
        </>
      ))}
      {/* <Agendum>
        <Text>2. Meet and greet</Text>
        <AiFillCaretLeft style={{ fontSize: "20px", color: "#5f6670" }} />
      </Agendum>
      <Agendum>
        <Text>3. Closing Prayer</Text>
        <AiFillCaretLeft style={{ fontSize: "20px", color: "#5f6670" }} />
      </Agendum>
      <Agendum>
        <Text>2. Meet and greet</Text>
        <AiFillCaretLeft style={{ fontSize: "20px", color: "#5f6670" }} />
      </Agendum>
      <Agendum>
        <Text>3. Closing Prayer</Text>
        <AiFillCaretLeft style={{ fontSize: "20px", color: "#5f6670" }} />
      </Agendum>
      <Agendum>
        <Text>2. Meet and greet</Text>
        <AiFillCaretLeft style={{ fontSize: "20px", color: "#5f6670" }} />
      </Agendum>
      <Agendum>
        <Text>3. Closing Prayer</Text>
        <AiFillCaretLeft style={{ fontSize: "20px", color: "#5f6670" }} />
      </Agendum>
      <Agendum>
        <Text>2. Meet and greet</Text>
        <AiFillCaretLeft style={{ fontSize: "20px", color: "#5f6670" }} />
      </Agendum>
      <Agendum>
        <Text>3. Closing Prayer</Text>
        <AiFillCaretLeft style={{ fontSize: "20px", color: "#5f6670" }} />
      </Agendum>
      <Agendum>
        <Text>2. Meet and greet</Text>
        <AiFillCaretLeft style={{ fontSize: "20px", color: "#5f6670" }} />
      </Agendum>
      <Agendum>
        <Text>3. Closing Prayer</Text>
        <AiFillCaretLeft style={{ fontSize: "20px", color: "#5f6670" }} />
      </Agendum> */}
    </Container>
  );
};

export default Agenda;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10%;
  padding-left: 5%;
  padding-right: 2%;
  overflow-y: scroll;
  /* background-color: beige; */
  width: 100%;
`;

const Header = styled.h2`
  font-weight: 500;
  margin-bottom: 3%;
  margin-top: 0px;
`;

const Agendum = styled.div`
  margin-bottom: 0%;
  margin-top: 0px;
  /* background-color: red; */
  padding-top: 1%;
  padding-bottom: 1%;
  border-bottom: 2px solid #f5f5f5;
  padding-left: 3%;
  padding-right: 3%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.h3`
  font-weight: 400;
  color: #5f6670;
`;

const Documents = styled.div`
  /* background-color: #f5f5f5; */
  padding-top: 3%;
  padding-bottom: 3%;
  padding-left: 15%;
`;

const Doc = styled.p`
  padding-top: 1%;
  padding-bottom: 1%;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    color: #f5a6a7;
  }
`;
