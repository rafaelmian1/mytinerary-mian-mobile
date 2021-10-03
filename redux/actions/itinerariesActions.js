import axios from "axios";

const itinerariesActions = {
  getItineraries: (id) => {
    return async (dispatch) => {
      try {
        let response = await axios.get(
          "https://my-tinerary-mian.herokuapp.com/api/itineraries/" + id
        );
        if (!response.data.success) {
          throw new Error(response.data.response);
        }

        dispatch({ type: "GET_ITINERARIES", payload: response.data.response });
        return { success: true };
      } catch (err) {
        // toast.error("We're doing some maintenance, please try later!", {
        //   position: "top-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: false,
        //   draggable: true,
        //   progress: undefined,
        // });
        console.error(err.message);
      }
    };
  },
  sortItineraries: (value) => {
    return (dispatch) => {
      dispatch({ type: "SORT_ITINERARIES", payload: value });
    };
  },
  resetState: () => {
    return (dispatch) => {
      dispatch({ type: "RESET" });
    };
  },
};
export default itinerariesActions;
