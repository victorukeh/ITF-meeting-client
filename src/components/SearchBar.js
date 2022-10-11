import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const SearchBar = ({ setSearchQuery }) => {
	return (
		<form>
			<TextField
				id="search-bar"
				className="text"
				onInput={(e) => {
					setSearchQuery(e.target.value);
				}}
				label="Enter title of a meeting"
				variant="outlined"
				placeholder="Search..."
				size="small"
                
                style={{width: "60%"}}
                // fullWidth
			/>
			<IconButton type="submit" aria-label="search">
				<SearchIcon style={{ fill: "blue" }} />
			</IconButton>
		</form>
	);
};

export default SearchBar;
