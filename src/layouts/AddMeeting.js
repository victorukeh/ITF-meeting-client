import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DragAndDrop from "../components/DragAndDrop";
import { useDataLayerValue } from "../reducer/DataLayer";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Groups2Icon from "@mui/icons-material/Groups2";

const AddMeeting = () => {
  const [{ fileList, addMeeting, meeting }, dispatch] = useDataLayerValue();
  const createMeeting = async () => {
    const response = await axios.post(
      "http://localhost:2000/api/v1/meeting/create-meeting",
      {
        name: addMeeting,
      }
    );
    console.log(response);
    await dispatch({
      type: "SET_MEETING",
      meeting: response.data.meeting,
    });
  };
  const [agendas, setagendas] = React.useState([]);
  const [agendaName, setagendaName] = React.useState("");
  const [selectedFiles, setSelectedFiles] = React.useState(null);
  const addnewAgenda = () => {
    setagendas((x) => {
      return [
        ...x,
        { name: agendaName, id: agendas.length + 1, selectedFiles },
      ];
    });

    setagendaName("");
    // setSelectedFiles("");
  };

  const removeAgenda = (m) => {
    setagendas((x) => {
      return [...x].filter((x) => x.id !== m.id);
    });
  };

  const getFilesName = (m) => {
    let text = "";

    if (m.selectedFiles) {
      for (let i = 0; i <= m.selectedFiles?.length - 1; i++) {
        text += m?.selectedFiles[i]?.name + ", ";
      }
    }

    return text;
  };
  return (
    <>
      <div style={{ marginRight: "5%", marginTop: "2%" }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <h3>New Meeting Information</h3>
          <div style={{ maxWidth: "500px" }}>
            <TextField
              id="outlined-basic"
              label="Enter new meeting name"
              variant="outlined"
              fullWidth
              size="small"
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
            />

            <TextField
              id="outlined-basic"
              label="Enter new meeting description"
              variant="outlined"
              fullWidth
              size="small"
            />

            <TextField
              id="datetime-local"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
            />  
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "20px 0",
            }}
          >
            <h3>Agendas - {agendas.length}</h3>
            <Button variant="contained">ADD NEW AGENDA</Button>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Agenda info"
              variant="outlined"
              size="small"
              fullWidth
              style={{
                marginTop: 10,
                marginRight: 10,
                maxWidth: "500px",
              }}
              value={agendaName}
              onChange={(e) => setagendaName(e.target.value)}
            />

            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                multiple
                onChange={(e) => {
                  setSelectedFiles(e.target.files);
                }}
              />
              <PhotoCamera />
            </IconButton>
          </div>

          <div>
            <Button
              variant="contained"
              component="label"
              onClick={addnewAgenda}
              disabled={!agendaName || !agendaName.trim()}
            >
              Add Agenda
            </Button>
          </div>

          {agendas.map((m) => {
            const txts = getFilesName(m);
            return (
              <ListItemButton onClick={() => removeAgenda(m)}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary={m.name} secondary={txts} />
              </ListItemButton>
            );
          })}
        </Box>
      </div>
    </>
  );
};

export default AddMeeting;

const Container = styled.div`
  flex: 0.8;
  background-color: white;
  display: flex;
  flex-direction: row;
`;

const MainContent = styled.div`
  padding-left: 5%;
  width: 100%;
  height: 15%;
  margin-right: 5%;
  /* background: white; */
`;
