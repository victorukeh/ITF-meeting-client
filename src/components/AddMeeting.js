// import React from "react";
// import { FormControl } from '@mui/material';

// const Meeting = () => {
// 	return <div style={{ flex: "0.5" }}>
//         <h3 style={{fontFamily: "Helvetica"}}>New Meeting</h3>
//         <p>1. May 26, 2016 meeting </p>
//         <p>2. May 26, 2017 meeting</p>
//         <p>3. June 26, 2018 meeting</p>
//         <p>4. May 26, 2019 meeting</p>
//         <p>5. August 26, 2020 meeting</p>
//     </div>;
// };

// export default Meeting;

import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Groups2Icon from "@mui/icons-material/Groups2";
export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const meetings = [
    {
      name: "Staff Meeting",
      time: "10:00am",
    },
    {
      name: "ICT Meeting",
      time: "9:00am",
    },
  ];

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        flex: "0.5",
        mr: 1,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Management Meetings
        </ListSubheader>
      }
    >
      {meetings.map((m) => {
        return (
          <ListItemButton>
            <ListItemIcon>
              <Groups2Icon />
            </ListItemIcon>
            <ListItemText primary={m.name} secondary={m.time} />
          </ListItemButton>
        );
      })}
    </List>
  );
}
