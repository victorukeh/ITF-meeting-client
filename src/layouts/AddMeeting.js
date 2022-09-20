import react from "react";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Input } from "@mui/material";
import { FormHelperText } from "@mui/material";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Header from "../components/Header";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


const AddMeeting = () => {
	return (
		<>
			<Container>
				<MainContent>
					<Header />
					{/* <FormControl style={{width: "90%"}}> */}
                    <div style={{marginRight: "5%", marginTop: "5%"}}>
                        <Box sx={{ flexGrow: 1 }}>
							<Grid container spacing={2}>
								<Grid item xs={5}>
                                <h3 style={{ color: "#0e2345" }}>Meeting Name: </h3>
								</Grid>
								<Grid item xs={7}>
                                <TextField style={{ marginTop: "2%" }} fullWidth/>
								</Grid>
							</Grid>
						</Box> 
						<Button variant="text" style={{ marginTop: "10%", marginLeft: "40vw", width: "40%" }}>
							Add Meeting
						</Button>
                    </div>
				</MainContent>
			</Container>
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


						{/* <Box sx={{ flexGrow: 1 }}>
							<Grid container spacing={2}>
								<Grid item xs={4}>
                                    <TextField id="input-with-sx" label="Name" fullWidth/>
								</Grid>
								<Grid item xs={4}>
                                <p style={{backgroundColor: "green"}}>house</p>
								</Grid>
								<Grid item xs={3}>
                                <p style={{backgroundColor: "green"}}>ljdaasdasdasdasd</p>
								</Grid>
							</Grid>
						</Box> */}