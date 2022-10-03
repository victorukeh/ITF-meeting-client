import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import React from "react";

export const Notification = ({message, vertical, horizontal, open, color, handleClose}) => {
  function TransitionLeft(props) {
	  return <Slide {...props} direction="right" />;
	}
  return (
    <Snackbar
					anchorOrigin={{ vertical, horizontal }}
					open={open}
					onClose={handleClose}
					message={message}
					ContentProps={{
						sx: {
						  background: color
						}
					  }}
					key={vertical + horizontal}
					// TransitionComponent={TransitionLeft} 
					action={
						<React.Fragment>
							<IconButton
								aria-label="close"
								color="inherit"
								sx={{ p: 0.5 }}
								onClick={handleClose}
							>
								<CloseIcon />
							</IconButton>
						</React.Fragment>
					}
				/>
  );
};