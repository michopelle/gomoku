export default (
  state = { error: { message: null }, isErrorVisible: false },
  action
) => {
  switch (action.type) {
    case "SET_ROOM_ERROR":
      return {
        ...state,
        error: { ...state.error, message: action.payload.error },
        isErrorVisible: action.payload.error !== false ? true : false,
      };
    default:
      console.log("from roomerror reducer default");
      return state;
  }
};
