const usersReducer = (
  state = {
    countries: [],
    user: null,
    token: null,
  },
  action
) => {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload
          .map((country) => {
            return {
              name: country.name.includes("(")
                ? country.name.slice(0, country.name.indexOf(" (")) +
                  country.name.slice(country.name.indexOf(")") + 1)
                : country.name,
            };
          })
          .filter((country) => country.name.length < 25),
      };
    case "LOGGED_IN":
      !state.token &&
        localStorage.setItem(
          "tokenMyTinerary",
          JSON.stringify(action.payload.token)
        );
      return {
        ...state,
        user: action.payload.user,
      };

    case "RESET_USER":
      localStorage.removeItem("tokenMyTinerary");
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default usersReducer;
