export default (state = null, action) => {
  switch (action.type) {
    case "SET_AUTH_USER":
      return action.payload.authUser;

    default:
      return state;
  }
};
