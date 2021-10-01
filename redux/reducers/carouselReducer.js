const carouselReducer = (state = { slides: [] }, action) => {
  switch (action.type) {
    case "GET_SLIDES":
      return {
        ...state,
        slides: action.payload,
      };

    default:
      return state;
  }
};

export default carouselReducer;
