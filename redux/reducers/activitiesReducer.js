const activitiesReducer = (
  state = { activities: [], comments: [] },
  action
) => {
  switch (action.type) {
    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    case "SET_COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };
    default:
      return state;
  }
};

export default activitiesReducer;
