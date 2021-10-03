import AsyncStorage from "@react-native-async-storage/async-storage";
const usersReducer = (
  state = {
    user: null,
  },
  action
) => {
  switch (action.type) {
    case "LOGGED_IN":
      const setStorage = async () => {
        try {
          await AsyncStorage.setItem("tokenMyTinerary", action.payload.token);
        } catch (er) {
          console.log(er);
        }
      };
      setStorage();
      return {
        user: action.payload.user,
      };

    case "RESET_USER":
      const cleanStorage = async () => {
        try {
          await AsyncStorage.removeItem("tokenMyTinerary");
        } catch (er) {
          console.log(er);
        }
      };
      cleanStorage();
      return {
        user: null,
      };
    default:
      return state;
  }
};

export default usersReducer;
