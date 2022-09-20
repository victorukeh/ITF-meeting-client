export const initialState = {
	email: "",
	password: "",
	token: null,
	user: null,
	events: []
};

// The reducer's primary job is to listen to actions
const reducer = (state, action) => {
	// Action has a type and a payload
	switch (action.type) {
        
		case "SET_EMAIL":
			return {
				...state,
				email: action.email,
			};

		case "SET_PASSWORD":
			return {
				...state,
				password: action.password,
			};

		case "SET_TOKEN":
			return {
				...state,
				token: action.token,
			};

		case "SET_USER":
			return {
				...state,
				user: action.user,
			};

		case "SET_EVENTS":
			return {
				...state,
				events: action.events,
			};

		case "SET_SEARCH":
			return {
				...state,
				search: action.search,
			};

		case "SET_SEARCHRESULTS":
			return {
				...state,
				searchResults: action.searchResults,
			};

		case "SET_SPOTIFY":
			return {
				...state,
				spotify: action.spotify,
			};

		case "SET_CHOOSETRACK":
			return {
				...state,
				chooseTrack: action.chooseTrack,
			};

		case "SET_PLAYLIST_TO_PLAY":
			return {
				...state,
				choice: action.choice,
			};

		case "SET_PLAYINGTRACK":
			return {
				...state,
				playingTrack: action.playingTrack,
			};

		case "SET_CATEGORIES":
			return {
				...state,
				category: action.category,
			};

		case "SET_PLAYLISTS_PER_CATEGORY":
			return {
				...state,
				categoryPlaylist: action.categoryPlaylist,
			};

		case "SET_CATEGORYID":
			return {
				...state,
				id: action.id,
			};

		case "SET_LYRICS":
			return {
				...state,
				lyrics: action.lyrics,
			};
		default:
			return state;
	}
};

export default reducer;
