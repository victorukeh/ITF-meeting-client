export const initialState = {
	email: "",
	password: "",
	token: JSON.parse(localStorage.getItem("token")) || null,
	user: JSON.parse(localStorage.getItem("user")) || null,
	events: [],
	dropDepth: 0,
	inDropZone: false,
	fileList: [],
	meetings: JSON.parse(localStorage.getItem("meetings")) || [],
	addMeeting: { title: "", description: "", start: "", end: "" },
	agenda: "",
	docs: [],
	fullAgenda: [],
	notification: "",
	viewMeeting: JSON.parse(localStorage.getItem("viewMeeting")) || null,
	agendaAndDocs: JSON.parse(localStorage.getItem("agendaAndDocs")) || [],
	checkMeeting: false,
	comments: JSON.parse(localStorage.getItem("comments")) || [],
	snackbar: {
		open: false,
		vertical: "top",
		horizontal: "right",
		notification: "",
		error: false,
	},
	viewMeetings: JSON.parse(localStorage.getItem("viewMeetings")) || [],
	allPolls: [],
	polls: [],
	users: JSON.parse(localStorage.getItem("users")) || [],
	pollsForMeeting: [],
	poll: JSON.parse(localStorage.getItem("poll")) || null,
	options: JSON.parse(localStorage.getItem("options")) || null,
	viewUser: JSON.parse(localStorage.getItem("viewUser")) || null,
	setMeeting: JSON.parse(localStorage.getItem("setMeeting")) || null,
	loading: false
};

// The reducer's primary job is to listen to actions
const reducer = (state, action) => {
	// Action has a type and a payload

	switch (action.type) {
		case "SET_LOADING":
			return {
				...state,
				loading: action.loading,
			};
		case "SET_MEETING":
			return {
				...state,
				setMeeting: action.setMeeting,
			};
		case "VIEW_USER":
			return {
				...state,
				viewUser: action.viewUser,
			};
		case "SET_OPTIONS":
			return {
				...state,
				options: action.options,
			};
		case "SET_USERS":
			return {
				...state,
				users: action.users,
			};
		case "SET_POLLSFORMEETING":
			return {
				...state,
				pollsForMeeting: action.pollsForMeeting,
			};
		case "SET_POLL":
			return {
				...state,
				poll: action.poll,
			};
		case "SET_ALLPOLLS":
			return {
				...state,
				allPolls: action.allPolls,
			};
		case "SET_VIEWMEETINGS":
			return {
				...state,
				viewMeetings: action.viewMeetings,
			};
		case "SET_SNACKBAR":
			return {
				...state,
				snackbar: action.snackbar,
			};
		case "SET_POLLS":
			return {
				...state,
				polls: action.polls,
			};
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
