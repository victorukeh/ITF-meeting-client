export const initialState = {
	email: "",
	password: "",
	token: null,
	user: null,
	events: [],
	dropDepth: 0,
	inDropZone: false,
	fileList: [],
	meeting: null
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

		case "SET_ADDMEETING":
			return {
				...state,
				addMeeting: action.addMeeting,
			};
		
		case "SET_MEETING":
		return {
			...state,
			meeting: action.meeting,
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

		case "SET_DROP_DEPTH":
			return {
				...state,
				dropDepth: action.dropDepth,
			};

		case "SET_IN_DROP_ZONE":
			return {
				...state,
				inDropZone: action.inDropZone,
			};

		case "ADD_FILE_TO_LIST":
			return {
				...state,
				fileList: action.fileList,
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
