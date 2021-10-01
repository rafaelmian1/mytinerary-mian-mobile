const activitiesReducer = (state = { activities: [] }, action) => {
  switch (action.type) {
    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    default:
      return state;
  }
};

export default activitiesReducer;
