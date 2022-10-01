export const initialState = {
	email: "",
	password: "",
	token: JSON.parse(localStorage.getItem("token")) || null,
	user: JSON.parse(localStorage.getItem("user")) || null,
	events: [],
	dropDepth: 0,
	inDropZone: false,
	fileList: [],
	meetings: [],
	addMeeting: { title: "", description: "", start: "", end: "" },
	agenda: "",
	docs: [],
	fullAgenda: [],
	notification: "",
	viewMeeting: null,
	agendaAndDocs: [],
	checkMeeting: false,
	comments: []
};

// The reducer's primary job is to listen to actions
const reducer = (state, action) => {
	// Action has a type and a payload
	switch (action.type) {
		// SET_COMMENTS
		case "SET_COMMENTS":
			return {
				...state,
				comments: action.comments,
			};

		case "SET_CHECKMEETING":
			return {
				...state,
				checkMeeting: action.checkMeeting,
			};

		case "SET_VIEWMEETING":
			return {
				...state,
				viewMeeting: action.viewMeeting,
			};

		case "SET_AGENDAANDDOCS":
			return {
				...state,
				agendaAndDocs: action.agendaAndDocs,
			};
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

		case "SET_MEETINGS":
			return {
				...state,
				meetings: action.meetings,
			};

		case "SET_PASSWORD":
			return {
				...state,
				password: action.password,
			};

		case "SET_AGENDA":
			return {
				...state,
				agenda: action.agenda,
			};
		case "SET_FULLAGENDA":
			return {
				...state,
				fullAgenda: action.fullAgenda,
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

		case "SET_NOTIFICATION":
			return {
				...state,
				notification: action.notification,
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
