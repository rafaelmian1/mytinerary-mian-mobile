import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";

const usersActions = {
  signUp: (data, props) => {
    return async (dispatch) => {
      try {
        let response = await axios.post(
          "https://my-tinerary-mian.herokuapp.com/api/user/signup",
          data
        );
        if (response.data.success) {
          props.navigation.navigate("home");
          Toast.show({
            type: "success",
            text1: "Welcome to MyTinerary " + response.data.user.first_name,
            text2: "Enjoy our content!",
            topOffset: 100,
            onPress: () => Toast.hide(),
          });
          dispatch({ type: "LOGGED_IN", payload: response.data });
        } else {
          Toast.show({
            type: "error",
            text1: "Oops!",
            text2: response.data.error[0].message,
            topOffset: 100,
            onPress: () => Toast.hide(),
          });

          return response.data.error;
        }
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

  logIn: (data, props) => {
    return async (dispatch) => {
      try {
        let response = await axios.post(
          "https://my-tinerary-mian.herokuapp.com/api/user/login",
          data
        );
        if (response.data.success) {
          console.log(props.navigation);
          props.navigation.navigate("home");
          Toast.show({
            type: "success",
            text1: "Welcome " + response.data.user.first_name,
            text2: "We missed you! 👋",
            topOffset: 100,
            onPress: () => Toast.hide(),
          });

          dispatch({ type: "LOGGED_IN", payload: response.data });
        } else {
          Toast.show({
            type: "error",
            text1: "Oops!",
            text2: response.data.response.includes("Google")
              ? response.data.response
              : "Email and/or password incorrect",
            topOffset: 100,
            onPress: () => Toast.hide(),
          });
        }
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

  like: (bool, id) => {
    return async (dispatch, getState) => {
      try {
        const token = await AsyncStorage.getItem("tokenMyTinerary");
        if (!token) throw new Error();
        await axios.put(
          "https://my-tinerary-mian.herokuapp.com/api/user/like/",
          { bool, id },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        return { success: true };
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Session timed out!",
          topOffset: 100,
          onPress: () => Toast.hide(),
        });
        dispatch({ type: "RESET_USER" });
      }
    };
  },

  comment: (id, action, comment, newComment) => {
    return async (dispatch, getState) => {
      try {
        const token = await AsyncStorage.getItem("tokenMyTinerary");
        if (!token) throw new Error();
        await axios.put(
          "https://my-tinerary-mian.herokuapp.com/api/user/comment/",
          { comment, id, action, newComment },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        action === "delete" &&
          dispatch({
            type: "SET_COMMENTS",
            payload: getState().activities.comments.filter(
              (com) => com.comment !== comment
            ),
          });
        action === "update" &&
          dispatch({
            type: "SET_COMMENTS",
            payload: getState().activities.comments.map((com) => {
              if (com.comment === comment) {
                return { ...com, comment: newComment };
              }
              return com;
            }),
          });
        return { success: true };
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Session timed out!",
          topOffset: 100,
          onPress: () => Toast.hide(),
        });

        dispatch({ type: "RESET_USER" });
      }
    };
  },

  getId: () => {
    return async (dispatch, getState) => {
      try {
        const token = await AsyncStorage.getItem("tokenMyTinerary");
        if (!token) throw new Error();
        let response = await axios.get(
          "https://my-tinerary-mian.herokuapp.com/api/user/id",

          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        return response.data.id;
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Session timed out!",
          topOffset: 100,
          onPress: () => Toast.hide(),
        });
        dispatch({ type: "RESET_USER" });
      }
    };
  },

  resetUser: () => {
    return (dispatch) => {
      Toast.show({
        type: "info",
        text1: "Good bye!",
        text2: "Hope to see you soon!",
        topOffset: 100,
        onPress: () => Toast.hide(),
      });
      dispatch({ type: "RESET_USER" });
    };
  },

  validateToken: () => {
    return async (dispatch, getState) => {
      let token;
      try {
        token = await AsyncStorage.getItem("tokenMyTinerary");
        if (!token) throw new Error();
        let response = await axios.get(
          "https://my-tinerary-mian.herokuapp.com/api/user/token",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.success) {
          return dispatch({
            type: "LOGGED_IN",
            payload: { ...response.data, token },
          });
        }
      } catch (err) {
        token &&
          Toast.show({
            type: "error",
            text1: "Oops!",
            text2: "Session timed out!",
            topOffset: 100,
            onPress: () => Toast.hide(),
          });
        dispatch({ type: "RESET_USER" });
        return console.log(err);
      }
    };
  },
};

export default usersActions;
