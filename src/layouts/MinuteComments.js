import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Back from "../components/Back";
import Time from "../components/Time";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import ReadMore from "../components/ReadMore";
import styled from "styled-components";
import Loading from "../components/Loading";
import { useDataLayerValue } from "../reducer/DataLayer";

const MinuteComments = () => {
    const [{ loading, comments, user, viewMeeting }, dispatch] =
        useDataLayerValue();
    return (
        <>
            {!loading ? <div>
                <Back to="/meetings/meeting/minutes" color="primary" />
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <h4>Comments</h4>
                </div>
                <div style={{ overflowY: "auto", height: "63vh" }}>
                    {comments.map((comment, id) => {
                        return (
                            <Paper style={paper} key={id}>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item xs zeroMinWidth>
                                        <GridBox>
                                            <HeaderBox><Header
                                                style={{
                                                    margin: 0,
                                                    textAlign: "left",
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                {comment.fullName}
                                            </Header>
                                            </HeaderBox>
                                            {/* <Delete>
                                    <DeleteIcon
                                        className={(comment.user === user._id && viewMeeting.ended === false) ? "logoField" : "seize"}
                                        onClick={deleteComment(comment._id, id + 1, {
                                            vertical: "top",
                                            horizontal: "right",
                                        })}
                                    />
                                </Delete> */}
                                        </GridBox>
                                        <Body>
                                            {comment.text.length > 124 ? (
                                                <ReadMore>{comment.text}</ReadMore>
                                            ) : (
                                                <Text>{comment.text}</Text>
                                            )}
                                        </Body>
                                        <Time date={comment.createdAt} />
                                    </Grid>
                                </Grid>
                            </Paper>);
                    })}</div>
            </div> : <Loader>
                <Loading type="spin" color="#7485e8" />
            </Loader>}
        </>
    )
}

export default MinuteComments

const paper = { padding: "5px 20px", marginTop: "10px" }
const Text = styled.p``
const Body = styled.h4`
	font-weight: lighter;
	text-align: left;
`
const Comments = styled.h5``
const Agenda = styled.p`
	font-size: 13px;
	font-family: cursive;
	margin-bottom: -2%;
`
const Header = styled.h4`
	margin: 0;
	text-align: "left";
	text-transform: uppercase;
`

const HeaderBox = styled.div`
	display: flex;
	flex-direction: column;
`

const GridBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`
const Comment = styled.div`
	padding-left: 1%;
	height: 78vh;
	width: 95%; 
	overflow-y: auto
`
const Container = styled.div``
const Loader = styled.div`
width: 100%;
 height: 70vh; 
 display: flex;
  align-items: center;
flex-direction: column;
 justify-content: center
`

const Delete = styled.div`
	.logoField {
		color: #9fa1a3;
		cursor: pointer;
		margin-right: 21%;
	}
	&:hover {
		.logoField {
			color: #f2a5ac;
		}
	}

	.seize{
		color: brown;
		margin-right: 21%;
		pointer-events: none;
	}
`;
