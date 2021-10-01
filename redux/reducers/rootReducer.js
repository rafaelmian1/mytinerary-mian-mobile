import { combineReducers } from "redux";
import carouselReducer from "./carouselReducer";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer";
import usersReducer from "./usersReducer";
import activitiesReducer from "./activitiesReducer";

const rootReducer = combineReducers({
  carousel: carouselReducer,
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  users: usersReducer,
  activities: activitiesReducer,
});

export default rootReducer;
