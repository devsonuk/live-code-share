const state = {
  loggedInUser: {
    id: "",
    roomId: "",
    firstName: "",
    lastName: "",
    fullName: "",
    avatar: "",
    avatarType: "",
    socketId: "",
  },
  roomId: "",
};
const getters = {
  getLoggedInUser(state) {
    return state.loggedInUser;
  },
  getRoomId(state) {
    return state.roomId;
  },
};
const mutations = {
  setLoggedInUser(state, payload) {
    for (const key in payload) {
      if (Object.hasOwnProperty.call(state.loggedInUser, key)) {
        state.loggedInUser[key] = payload[key];
      }
    }
  },
  setRoomId(state, payload) {
    state.roomId = payload;
  },
};
const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
