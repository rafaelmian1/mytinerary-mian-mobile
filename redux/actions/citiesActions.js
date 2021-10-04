import axios from "axios";
import Toast from "react-native-toast-message";

const citiesActions = {
  getCities: (props) => {
    return async (dispatch) => {
      try {
        let response = await axios.get(
          "https://my-tinerary-mian.herokuapp.com/api/cities"
        );
        if (!response.data.success) {
          throw new Error(response.data.response);
        }
        dispatch({ type: "GET_CITIES", payload: response.data.response });
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "We're doing some maintenance, please try later!",
          topOffset: 100,
          onPress: () => Toast.hide(),
        });
        console.error(err.message);
        props.navigation.navigate("error");
      }
    };
  },
  getCity: (props) => {
    return async (dispatch) => {
      try {
        let response = await axios.get(
          "https://my-tinerary-mian.herokuapp.com/api/city/" +
            props.match.params.id
        );
        if (!response.data.success) {
          throw new Error(response.data.response);
        }
        dispatch({ type: "GET_CITY", payload: response.data.response });
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "We're doing some maintenance, please try later!",
          topOffset: 100,
          onPress: () => Toast.hide(),
        });
        console.error(err.message);
        props.navigation.navigate("error");
      }
    };
  },

  filterCities: (input) => {
    return (dispatch) => dispatch({ type: "FILTER_CITIES", payload: input });
  },

  resetFilteredCities: () => {
    return (dispatch) => dispatch({ type: "RESET_FILTERED_CITIES" });
  },

  resetCity: () => {
    return (dispatch) => dispatch({ type: "RESET_CITY" });
  },
};

export default citiesActions;
