import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../reducer/DataLayer";
import AddCommentIcon from "@material-ui/icons/AddComment";
import TextField from "@mui/material/TextField";
import Loading from "../components/Loading";
import Box from "@mui/material/Box";
import DropDown from "../components/DropDown";
import ArrowButton from "../components/icons/ArrowButton";
import MeetingType from "../components/MeetingType";
import MeetingSize from "../components/MeetingSize";
import Microphone from "../components/icons/Microphone";
import Pin from "../components/icons/Pin";
import Muted from "../components/icons/Muted";
import TrayIcon from "../components/icons/TrayIcon";
import EndMeeting from "../components/buttons/EndMeeting";
import Chat from "../components/Chat"
import axios from "axios";
import {  BiExpand } from "react-icons/bi";
import {  MdGroups2 } from "react-icons/md";
import {  BsThreeDots, BsFillMicFill, BsFillCameraVideoFill, BsFillMicMuteFill, BsFillCameraVideoOffFill, BsPinAngleFill, BsPinFill } from "react-icons/bs";
import {  FaPoll, FaCompress } from "react-icons/fa";

// BsFillCameraVideoOffFill
// import MeetingBox from ""
import "../styles/css/dropDown.css";
import SplideCarousel from "../components/SplideCarousel";

const UserMeeting = () => {
  const [{ loading, viewMeeting, agendaAndDocs, token, user }, dispatch] =
    useDataLayerValue();
  const [addComment, setAddComment] = useState("");
  const [comment, setComment] = useState({
    id: "",
    isOpen: false,
  });
  const [chat, setChat] = useState(true);
  const [speak ,setSpeak ] = useState(false)
  const [video, setVideo] = useState(false)
  const [compress, setCompress] = useState(false)
  const [pin, setPin] = useState(false)
  const [voice, setVoice] = useState(false)

  const handleComment = (event) => {
    setAddComment(event.target.value);
  };

  const commentHandler = (id) => {
    setAddComment("");
    setComment({
      id: id,
      isOpen: !comment.isOpen,
    });
  };

  const createComment = (id, index, newState) => async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/meeting/comment/add?meeting=${viewMeeting._id}&agenda=${id}`,
        {
          text: addComment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await commentHandler(index);
      await dispatch({
        type: "SET_SNACKBAR",
        snackbar: {
          open: true,
          notification: response.data.message,
          ...newState,
        },
      });
    } catch (err) {
      await dispatch({
        type: "SET_SNACKBAR",
        snackbar: {
          open: true,
          error: true,
          notification: err.response.data.error,
          ...newState,
        },
      });
    }
  };

  const getPolls = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/meeting/poll-meet?meeting=${viewMeeting._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await dispatch({
        type: "SET_POLLSFORMEETING",
        pollsForMeeting: response.data.polls,
      });
      window.localStorage.setItem(
        "pollsForMeeting",
        JSON.stringify(response.data.polls)
      );
    } catch (err) {
      if (err.response.status === 401) {
        window.localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };

  const endMeeting = (newState) => async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/meeting/end?id=${viewMeeting._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await dispatch({
        type: "SET_VIEWMEETING",
        viewMeeting: response.data.meeting,
      });
      await dispatch({
        type: "SET_SNACKBAR",
        snackbar: {
          open: true,
          notification: response.data.message,
          ...newState,
        },
      });
    } catch (err) {
      if (err.response.status === 401) {
        window.localStorage.removeItem("token");
        window.location.reload(false);
      }
      await dispatch({
        type: "SET_SNACKBAR",
        snackbar: {
          open: true,
          error: true,
          notification: err.message,
          ...newState,
        },
      });
    }
  };

  const getAdminComments = async () => {
    try {
      await dispatch({
        type: "SET_LOADING",
        loading: true,
      });
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/meeting/comments?meeting=${viewMeeting._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({ type: "SET_COMMENTS", comments: response.data.comments });

      window.localStorage.setItem(
        "comments",
        JSON.stringify(response.data.comments)
      );
      await dispatch({
        type: "SET_LOADING",
        loading: false,
      });
    } catch (err) {
      if (err.response.status === 401) {
        window.localStorage.removeItem("token");
        window.location.reload(false);
      }
    }
  };
  const setMeeting = async () => {
    await dispatch({
      type: "SET_CHECKMEETING",
      checkMeeting: false,
    });
  };

  const users = [
    {
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      alt: "pic1",
    },
    {
      image:
        "https://media.istockphoto.com/id/1220136617/photo/happy-african-teen-girl-blogger-talking-to-camera-video-calling-recording-vlog-happy-afro.jpg?s=612x612&w=0&k=20&c=58m5lsdab69UxD38bZ2qrbi4MiIAY6N4aAhTQc--NF8=",
      alt: "pic2",
    },
    {
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      alt: "pic3",
    },
    {
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      alt: "pic1",
    },
    {
      image:
        "https://media.istockphoto.com/id/1303366695/photo/portrait-of-smiling-african-american-young-woman-indoors-talking-to-camera-video-calling.jpg?s=612x612&w=0&k=20&c=zX_K5PfqzhuvHWc_QDYdCem3Lw2qa2dBdf0tTEn5wkg=",
      alt: "pic2",
    },
    {
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      alt: "pic3",
    },
    {
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      alt: "pic1",
    },
    {
      image:
        "https://media.istockphoto.com/id/669888024/photo/businessman-in-textile-factory.jpg?s=612x612&w=0&k=20&c=m-g6TVWaAChfSdStLzHoNuegjVdAop9JJMIJoICb2Kw=",
      alt: "pic2",
    },
    {
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      alt: "pic3",
    },
  ];
  return (
    <>
      {!loading ? (
        <Container>
          <Interaction style={{ width: chat === false && "100%" }}>
            <Section1>
              <ArrowButton />
              <Header>
                <Text1>UI Meeting weekly monthly yearly Week 15</Text1>{" "}
                <Text2>20 May, 2022</Text2>
              </Header>
              <MeetingType />
              <MeetingSize size="31" />
            </Section1>
            <Section2>
              {!pin ? <Pin color="#34ac96" bg="#ffffff" Icon={BsPinAngleFill} onClick={() => setPin(!pin)} pin={pin}/> : <Pin color="#f95a39" bg="#ffffff" Icon={BsPinFill} onClick={() => setPin(!pin)} pin={pin}/>}
             {voice ? <Microphone color="#ffffff" bg="#3a84f8" Icon={BsFillMicFill} onClick={() => setVoice(!voice)}/>: <Microphone color="#ffffff" bg="#3a84f8" Icon={BsFillMicMuteFill} onClick={() => setVoice(!voice)}/>}
            </Section2>
            <Section3>
              <Conversation>
                {" "}
                {users.map((row, id) => {
                  return (
                    <Display style={{ backgroundImage: `url(${row.image})` }} >
						<Muted color="#262827" bg="#ffffff"/>
					</Display>
                  );
                })}
              </Conversation>
            </Section3>
			<Section4>
				<TrayIcon Icon={MdGroups2} onClick={(e) => setChat(!chat)}/>
				{!compress ? <TrayIcon Icon={BiExpand} onClick={() => setCompress(!compress)}/> : <TrayIcon Icon={FaCompress} onClick={() => setCompress(!compress)}/>}
				{speak ? <TrayIcon Icon={BsFillMicFill} onClick={() => setSpeak(!speak)}/> : <TrayIcon Icon={BsFillMicMuteFill} onClick={() => setSpeak(!speak)}/>}
				<EndMeeting/>
				{video ? <TrayIcon Icon={BsFillCameraVideoFill} onClick={() => setVideo(!video)}/>: <TrayIcon Icon={BsFillCameraVideoOffFill} onClick={() => setVideo(!video)}/>}
				<TrayIcon Icon={FaPoll}/>
				<TrayIcon Icon={BsThreeDots}/>
			</Section4>
          </Interaction>
          {chat == true && <Work>
				<Chat/>
			</Work>}
          {/* <MeetingBox>
              <MeetingText>{viewMeeting.title}</MeetingText>
              <MeetingParagraph>{viewMeeting.description}</MeetingParagraph>
            </MeetingBox> */}

          {/* <MeetingView>
              {agendaAndDocs.map((f, id) => (
                <AgendaView key={id}>
                  <AgendaItems>
                    <Agenda>
                      {id + 1}. {f.agenda.name}
                    </Agenda>
                    <DropDown button="Documents" items={f.docs} />
                  </AgendaItems>
                  {user.role === "user" && (
                    <Comment onClick={() => commentHandler(id)}>
                      <AddCommentIcon className="commentIcon" />
                      <CommentText>Add Comment</CommentText>
                    </Comment>
                  )}
                  {comment.isOpen && comment.id === id && (
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "85%" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="outlined-multiline-static"
                        label="Comment"
                        multiline
                        rows={4}
                        value={addComment}
                        onChange={handleComment}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "86%",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginLeft: "58%", width: "20%" }}
                          disabled={true && addComment.length === 0}
                          onClick={createComment(f.agenda._id, id, {
                            vertical: "top",
                            horizontal: "right",
                          })}
                        >
                          Submit
                        </Button>
                        <Button
                          variant="contained"
                          color="warning"
                          style={{ width: "20%" }}
                          onClick={() => commentHandler(id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Box>
                  )}
                  <ButtonBox>
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/meetings/meeting/comments"
                    >
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => getAdminComments()}
                      >
                        View Comments
                      </Button>
                    </Link>
                    <Link
                      style={{ textDecoration: "none", marginLeft: "2%" }}
                      to="/meetings/meeting/vote"
                      onClick={() => getPolls()}
                    >
                      {user.role === "admin" && (
                        <Button variant="contained" color="primary">
                          Add & View Polls
                        </Button>
                      )}
                      {user.role === "user" && (
                        <Button variant="contained" color="primary">
                          View Polls
                        </Button>
                      )}
                    </Link>
                    {viewMeeting.ended === true && (
                      <Link
                        style={{ textDecoration: "none", marginLeft: "2%" }}
                        to="/meetings/meeting/minutes"
                      >
                        {user.role === "admin" && (
                          <Button variant="contained" color="secondary">
                            Add & View Minutes
                          </Button>
                        )}
                        {user.role === "user" && (
                          <Button variant="contained" color="secondary">
                            View Minutes
                          </Button>
                        )}
                      </Link>
                    )}
                    {user.role === "admin" && viewMeeting.ended === false && (
                      <Button
                        onClick={endMeeting({
                          vertical: "top",
                          horizontal: "right",
                        })}
                        style={{ marginLeft: "2%" }}
                        variant="contained"
                        color="warning"
                      >
                        End Meeting
                      </Button>
                    )}
                    <Link
                      style={{ textDecoration: "none", marginLeft: "2%" }}
                      to="/"
                      onClick={() => setMeeting()}
                    >
                      <Button variant="contained" color="error">
                        Leave Meeting
                      </Button>
                    </Link>
                  </ButtonBox>
                </AgendaView>
              ))}
            </MeetingView> */}
        </Container>
      ) : (
        <Loader>
          <Loading type="spin" color="#7485e8" />
        </Loader>
      )}
    </>
  );
};

export default UserMeeting;

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  width: 100%;
  height: 100vh;
  /* flex-direction: row;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 3px;
  overflow-y: hidden;  */
`;

const Interaction = styled.div`
  display: flex;
  width: 70%;
  margin-top: 2%;
  margin-bottom: 2%;
  border-radius: 30px;
  height: 92vh;
  flex-direction: column;
  background-color: #f5f5f5;

  /* flex-direction: row;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 3px;
  overflow-y: hidden; */
`;

const Work = styled.div`
  display: flex;
  width: 30%;
  height: 100vh;
  flex-direction: row;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 3px;
  overflow-y: hidden;
`;

const Section1 = styled.div`
  margin-top: 3%;
  margin-left: 3%;
  margin-right: 3%;
  display: flex;
  flex-direction: row;
  flex: 0.1;
`;
const Header = styled.div`
  margin-left: 5%;
  /* width: 31em; */
`;

const Text1 = styled.p`
  font-size: 20px;
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: 500;
  width: auto;
  white-space: nowrap;

  /* @media (max-width: 768px) {
    font-size: 14px;
  } */

  @media (max-width: 1360px) {
    font-size: 14px;
  }
`;

const Text2 = styled.p`
  font-size: 12px;
  margin-top: 10px;
  color: #333;
  font-weight: 300;
  width: auto;
`;

const Section2 = styled.div`
  margin-left: 3%;
  margin-right: 3%;
  width: auto;
  border-radius: 15px;
  background-image: url("https://media.istockphoto.com/id/1295425402/photo/businesswoman-talking-during-video-call-in-the-office.jpg?s=612x612&w=0&k=20&c=ql2yfi5_sEpxWwasArETDOA9o3k1fP5SACj3e3G407o=");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  flex: 0.6;
  display: flex;
  padding-top: 1%;
  padding-right: 1%;
  justify-content: flex-end;
`;

const Section3 = styled.div`
  margin-left: 3%;
  margin-right: 3%;
  flex: 0.25;
  align-items: center;
  overflow: auto;
  padding-top: 2%;
`;

const Conversation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  overflow: auto;
`;

const Display = styled.div`
  border-radius: 10px;
  width: 30%;
  height: 90%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  margin-bottom: 5%;
  display: flex;
  justify-content: flex-end;
  padding-top: 1%;
  padding-right: 1%;
`;

const Section4 = styled.div`
  flex: 0.15;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const View = styled.div`
  flex: 0.7;
  background-color: #f5f5f5;
  border-radius: 20px;
`;

const Loader = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

// const Container = styled.div`
// 	width: 80%;
// 	margin-left: 10%;
// 	margin-right: 10%;
// 	-moz-box-shadow: 0 0 3px #ccc;
// 	-webkit-box-shadow: 0 0 3px #ccc;
// 	box-shadow: 0 0 3px #ccc;
// 	height: 70vh;
// 	overflow-y: auto;
// `;

const MeetingText = styled.div`
  margin-top: 2%;
  font-family: Helvetica;
  font-weight: bold;
`;

const MeetingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

const MeetingParagraph = styled.p`
  font-family: Verdana, sans-serif;
  margin-left: 5%;
  margin-right: 5%;
  text-align: center;
  font-size: 14px;
  color: #333;
`;
const MeetingView = styled.div`
  margin-left: 5%;
  overflow-y: auto;
  height: 79vh;
`;

const AgendaView = styled.div`
  display: flex;
  flex-direction: column;
`;

const AgendaItems = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 4%;
`;

const Agenda = styled.p`
  flex: 0.8;
  font-size: 1.1rem;
`;

const List = styled.ul``;

const ListContent = styled.div``;

const ListItem = styled.li``;

const ButtonBox = styled.div`
  background: white;
  position: fixed;
  height: 10%;
  width: 78.3%;
  bottom: 0;
  right: 0;
  border-top: 1px solid grey;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 3%;
  width: 17%;
  justify-content: space-around;
  cursor: pointer;
`;

const CommentText = styled.p`
  margin-top: 0px;
  font-size: 0.86rem;
  color: #bfe30e;
`;
// const Box = styled.div`
// 	width: 45%;
// 	-moz-box-shadow: 0 0 3px #ccc;
// 	-webkit-box-shadow: 0 0 3px #ccc;
// 	box-shadow: 0 0 3px #ccc;
// 	display: flex;
// 	justify-content: center;
// `;