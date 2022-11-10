import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Back from "../components/Back";
import axios from "axios"
import { useDataLayerValue } from "../reducer/DataLayer";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";

const Minutes = () => {
    const [
        { loading, viewMeeting, agendaAndDocs, token, user },
        dispatch,
    ] = useDataLayerValue();
    const defaultMinutes = {
        name: "",
        originalname: null,
        updatedAt: null
    }
    const [active, setActive] = useState(false)
    const [minutes, setMinutes] = useState(defaultMinutes)
    const [selectedFile, setSelectedFile] = useState(null);
    const [addComment, setAddComment] = useState("");
    const date = minutes.originalname !== null ? new Date(minutes.updatedAt).toLocaleString() : null

    useEffect(() => {
        getMinutes()
    }, [])

    const getComments = async () => {
        try {
            dispatch({
                type: "SET_LOADING",
                loading: true
            })
            const response = await axios.get(`${process.env.REACT_APP_URL}/meeting/comments/minutes?meeting=${viewMeeting._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response.data.comments)
            dispatch({
                type: "SET_COMMENTS",
                comments: response.data.comments
            })
            window.localStorage.setItem("comments", JSON.stringify(response.data.comments))
            dispatch({
                type: "SET_LOADING",
                loading: false
            })
        } catch (err) {
            if (err.response.status === 401) {
                window.localStorage.removeItem("token")
                window.location.reload(false)
            }
        }
    }
    const getMinutes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/meeting/minutes?meeting=${viewMeeting._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.data.minutes[0].length < 1) {
                setMinutes(defaultMinutes)
            } else {
                setMinutes(response.data.minutes[0])
            }
        } catch (err) {
            setMinutes(defaultMinutes)
            if (err.response.status === 401) {
                window.localStorage.removeItem("token")
                window.location.reload(false)
            }
        }
    }

    const replace = (newState) => async () => {
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            const response = await axios.put(
                `${process.env.REACT_APP_URL}/meeting/replace?meeting=${viewMeeting._id}`,
                formData, {
                headers: { Authorization: `Bearer ${token}` },
            }
            );
            await dispatch({
                type: "SET_SNACKBAR",
                snackbar: {
                    open: true,
                    notification: response.data.message,
                    ...newState,
                },
            });
            setSelectedFile(null)
            await getMinutes()
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
    }

    const upload = (newState) => async () => {
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            const response = await axios.post(
                `${process.env.REACT_APP_URL}/meeting/file?meeting=${viewMeeting._id}`,
                formData, {
                headers: { Authorization: `Bearer ${token}` },
            }
            );
            await dispatch({
                type: "SET_SNACKBAR",
                snackbar: {
                    open: true,
                    notification: response.data.message,
                    ...newState,
                },
            });
            await getMinutes()
            setSelectedFile(null)
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
    }

    const createComment = (newState) => async () => {
        try {
            const minutes = "minutes"
            const response = await axios.post(
                `${process.env.REACT_APP_URL}/meeting/comment/add?meeting=${viewMeeting._id}&type=${minutes}`,
                {
                    text: addComment,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
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

    const handleComment = (event) => {
        setAddComment(event.target.value);
    };
    let url = minutes !== null && `${process.env.REACT_APP_URL}/${minutes.name}`
    return (
        <>
            <Back to="/meetings/meeting/" color="primary" />
            <Container>
                <Form>
                    {minutes.originalname !== null ? <a href={url} style={{ textDecoration: "none", color: "white" }} rel="noopener noreferrer"
                        target="_blank"><h3 style={{ fontSize: "18px", marginRight: "5%", fontFamily: "Open Sans" }}>{minutes.originalname}</h3></a> : <h3 style={{ marginRight: "5%", fontFamily: "Open Sans" }}>No File Uploaded</h3>}
                    {user.role === "admin" && <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                    >
                        <input
                            hidden
                            accept="image/*,application/*"
                            type="file"
                            onChange={(e) => {
                                setSelectedFile(e.target.files[0]);
                            }}
                        />
                        <UploadFileIcon />
                    </IconButton>}
                    {user.role === "admin" && minutes.originalname === null && <Button
                        variant="contained"
                        component="label"
                        disabled={selectedFile === null ? true : false}
                        onClick={upload({
                            vertical: "top",
                            horizontal: "right",
                        })}
                    >
                        Upload
                    </Button>}
                    {user.role === "admin" && minutes.originalname !== null && <Button
                        variant="contained"
                        component="label"
                        disabled={selectedFile === null ? true : false}
                        onClick={replace({
                            vertical: "top",
                            horizontal: "right",
                        })}
                    >
                        Replace
                    </Button>}
                    {minutes.originalname !== null && <Link to="/meetings/meeting/minutes/comments" style={{ textDecoration: "none" }}><Button
                        variant="contained"
                        component="label"
                        color="success"
                        style={{ marginLeft: "10%" }}
                        onClick={() => getComments()}
                    >
                        Comments
                    </Button></Link>}
                    {user.role === "user" && minutes.originalname !== null && <Button
                        variant="contained"
                        component="label"
                        color="warning"
                        style={{ marginLeft: "2%" }}
                        onClick={() => setActive(true)}
                    >
                        Add Comment
                    </Button>}
                </Form>
            </Container>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                {date !== null && <p style={{ fontFamily: "cursive", marginTop: "0px" }}>Uploaded on {date}</p>}
            </div>
            {user.role === "user" && active === true && <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { width: "100%" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-multiline-static"
                    label="Comment on minutes"
                    variant="filled"
                    multiline
                    minRows={3}
                    value={addComment}
                    onChange={handleComment}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "flex-end",
                        marginTop: "1%"
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ width: "20%" }}
                        disabled={true && addComment.length === 0}
                        onClick={createComment({
                            vertical: "top",
                            horizontal: "right",
                        })}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        style={{ marginLeft: "2%", width: "20%" }}
                        onClick={() => setActive(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </Box>}
        </>
    )
}

export default Minutes

const Form = styled.div`
            width: 100%;
            display: flex;
            align-items: center;
            margin: 20px 0;
            display: flex;
            justify-content: center;
            `;

const Container = styled.div`
            border-radius: 5px;
            background: #0e2345;
            color: white;
            width: 100%;
            /* height: 10vh;  */
            `