import axios from "axios";
import { toast } from "react-toastify";

const activitiesActions = {
  getActivities: (id) => {
    return async (dispatch, getState) => {
      try {
        let response = await axios.get(
          "https://my-tinerary-mian.herokuapp.com/api/activities/" + id
        );
        response.data.success &&
          dispatch({ type: "GET_ACTIVITIES", payload: response.data.response });
        return response.data.success;
      } catch (err) {
        console.error(err);
        toast.error("We're doing some maintenance, please try later!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    };
  },
};

export default activitiesActions;
