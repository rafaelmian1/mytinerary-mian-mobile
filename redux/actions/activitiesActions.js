import axios from "axios";
import Toast from "react-native-toast-message";

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
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "We're doing some maintenance, please try later!",
          topOffset: 100,
          onPress: () => Toast.hide(),
        });
      }
    };
  },
  setComments: (comments) => {
    return (dispatch) => {
      dispatch({ type: "SET_COMMENTS", payload: comments });
    };
  },
};

export default activitiesActions;
