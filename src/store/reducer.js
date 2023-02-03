const initialState = {
  user: {}
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_USER":
      state.user[action.payload[0]] = action.payload[1];
      console.log(state.user)
      return { ...state, user: state.user };
    case "DELETE_USER":
      delete state.user[action.payload[0]]
      return { ...state, user: state.user }
    default:
      return state;
  }
}




export default reducer;