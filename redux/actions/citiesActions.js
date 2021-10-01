import axios from "axios";
import { toast } from "react-toastify";

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
        toast.error("We're doing some maintenance, please try later!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        console.error(err.message);
        props.history.push("/error");
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
        toast.error("We're doing some maintenance, please try later!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        console.error(err.message);
        props.history.push("/error");
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
