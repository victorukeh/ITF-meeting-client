import * as React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import MeetingPreview from "../components/MeetingPreview";

const rows = [
  { name: "Meeting 1", decription: "Description 1", date: "20/12/12" },
  { name: "Meeting 2", decription: "Description 2", date: "21/12/12" },
  { name: "Meeting 3", decription: "Description 3", date: "22/12/12" },
];

export default function BasicTable() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MeetingPreview
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        open={open}
        setOpen={setOpen}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          margin: "20px 0",
        }}
      >
        <Link style={{ textDecoration: "none" }} to="/add-meeting">
          <Button variant="contained">ADD NEW MEETING</Button>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Meeting Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.decription}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                  <Button onClick={handleClickOpen}>PREVIEW</Button>
                  <Button>EDIT</Button>
                  <Button>DELETE</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
