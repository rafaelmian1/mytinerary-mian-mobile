import axios from "axios";

const carouselActions = {
  getSlides: (props) => {
    return async (dispatch) => {
      try {
        let response = await axios.get(
          "https://my-tinerary-mian.herokuapp.com/api/carousel"
        );
        if (!response.data.success) {
          throw new Error(response.data.response);
        }
        dispatch({ type: "GET_SLIDES", payload: response.data.response });
      } catch (err) {
        console.error(err.message);
        props.navigation.navigate("error");
      }
    };
  },
};

export default carouselActions;
