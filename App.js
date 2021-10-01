import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Navigator from "./navigation/MainNavDrawer";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";

const myTineraryStore = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={myTineraryStore}>
        <Navigator />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
