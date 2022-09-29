import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import MenuItem from "@mui/material/MenuItem";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const linka =
  "https://www.researchgate.net/profile/Eberechukwu-Eze/publication/283676391_Electronic_Theses_and_Dissertations/links/5643206b08ae9f9c13e01ff7/Electronic-Theses-and-Dissertations.pdf";
const currencies = [
  {
    value: "Document 1.pdf",
    label: "Document 1",
  },

  {
    value: "Document 2.pdf",
    label: "Document 2.pdf",
  },

  {
    value: "Document 3.pdf",
    label: "Document 3.pdf",
  },
];

export default function FullScreenDialog({
  setOpen,
  open,
  handleClickOpen,
  handleClose,
}) {
  const [currency, setCurrency] = React.useState("Document 1.pdf");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", background: "#b20505"}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Meeting Information{" "}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ padding: 20 }}>
          <h3>Meeting Information</h3>
          <p>
            Lorem ipsum dolor sit amet, ius in iisque volutpat definitiones, no
            per summo appetere antiopam. At ceteros noluisse invidunt mei, mel
            graeco feugiat et. Vix nostro contentiones vituperatoribus ex. Suas
            eros vide his et, ad fugit inani electram has, pro in equidem
            iracundia dissentiunt. Cu eos paulo volutpat, nec inani utamur
            voluptatum ea, vix omnis iisque eu. Everti conceptam id usu. Alii
            persius nam ut.
          </p>

          <h3>Meeting Agendas</h3>
          <ol>
            <br />
            <li>
              <div>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    marginBottom: 25,
                  }}
                >
                  <h5>Agenda 1</h5>
                  <TextField
                    id="outlined-select-currency"
                    select
                    size="small"
                    value={currency}
                    onChange={handleChange}
                    style={{ marginLeft: 20, width: "100%", maxWidth: "300px" }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <a href={linka} target="_blank">
                          {option.label}
                        </a>
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <TextField
                  id="outlined-basic"
                  label="Insert comment"
                  variant="outlined"
                  fullWidth
                  size="small"
                  style={{ maxWidth: 500, marginBottom: 10 }}
                  multiline
                  rows={3}
                />
                <br />
                <Button variant="contained" size="small">
                  Add Comment
                </Button>
              </div>
            </li>

            <br />
            <li>
              <div>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    marginBottom: 25,
                  }}
                >
                  <h5>Agenda 2</h5>
                  <TextField
                    id="outlined-select-currency"
                    select
                    size="small"
                    value={currency}
                    onChange={handleChange}
                    style={{ marginLeft: 20, width: "100%", maxWidth: "300px" }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <TextField
                  id="outlined-basic"
                  label="Insert comment"
                  variant="outlined"
                  fullWidth
                  size="small"
                  style={{ maxWidth: 500, marginBottom: 10 }}
                  multiline
                  rows={3}
                />
                <br />
                <br />
                <Button variant="contained" size="small">
                  Add Comment
                </Button>
              </div>
            </li>

            <br />
            <li>
              <div>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    marginBottom: 25,
                  }}
                >
                  <h5>Agenda 3</h5>
                  <TextField
                    id="outlined-select-currency"
                    select
                    size="small"
                    value={currency}
                    onChange={handleChange}
                    style={{ marginLeft: 20, width: "100%", maxWidth: "300px" }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <TextField
                  id="outlined-basic"
                  label="Insert comment"
                  variant="outlined"
                  fullWidth
                  size="small"
                  style={{ maxWidth: 500, marginBottom: 10 }}
                  multiline
                  rows={3}
                />
                <br />
                <Button variant="contained" size="small">
                  Add Comment
                </Button>
              </div>
            </li>
          </ol>
        </div>
      </Dialog>
    </div>
  );
}
