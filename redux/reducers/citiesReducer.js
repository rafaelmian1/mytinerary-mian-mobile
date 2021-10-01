const citiesReducer = (
  state = { cities: [], filteredCities: [], city: null },
  action
) => {
  switch (action.type) {
    case "GET_CITIES":
      return {
        ...state,
        cities: action.payload,
        filteredCities: action.payload,
      };
    case "GET_CITY":
      return {
        ...state,
        city: action.payload,
      };
    case "FILTER_CITIES":
      return {
        ...state,
        filteredCities: state.cities.filter((city) =>
          city.city.toLowerCase().startsWith(action.payload)
        ),
      };
    case "RESET_CITY":
      return {
        ...state,
        city: null,
      };

    case "RESET_FILTERED_CITIES":
      return {
        ...state,
        filteredCities: state.cities,
      };
    default:
      return state;
  }
};

export default citiesReducer;
