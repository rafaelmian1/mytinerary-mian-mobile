import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Navigator from "./navigation/MainNavDrawer";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";
import Toast, {
  ErrorToast,
  SuccessToast,
  InfoToast,
} from "react-native-toast-message";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const myTineraryStore = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  const [loaded] = useFonts({
    Lato: require("./assets/Lato-Light.ttf"),
    LatoRegular: require("./assets/Lato-Regular.ttf"),
  });
  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff7f50" />
      </View>
    );
  }
  const config = {
    success: (rest) => (
      <SuccessToast
        {...rest}
        text1Style={{ fontFamily: "Lato", fontSize: 20 }}
        text2Style={{ fontFamily: "Lato", fontSize: 15, color: "black" }}
        contentContainerStyle={{ padding: 5 }}
      />
    ),
    error: (rest) => (
      <ErrorToast
        {...rest}
        text1Style={{ fontFamily: "Lato", fontSize: 20 }}
        text2Style={{ fontFamily: "Lato", fontSize: 15, color: "black" }}
        contentContainerStyle={{ padding: 5 }}
      />
    ),
    info: (rest) => (
      <InfoToast
        {...rest}
        text1Style={{ fontFamily: "Lato", fontSize: 20 }}
        text2Style={{ fontFamily: "Lato", fontSize: 15, color: "black" }}
        contentContainerStyle={{ padding: 5 }}
      />
    ),
  };
  return (
    <NavigationContainer>
      <Provider store={myTineraryStore}>
        <Navigator />
        <StatusBar animated={true} backgroundColor="#b9a698" />
        <Toast config={config} ref={(ref) => Toast.setRef(ref)} />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
