import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./HomeStack";
import CitiesStack from "./CitiesStack";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import { Pressable, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const NavigatorDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="home"
        component={HomeStack}
        options={{
          title: "Home",
          headerStyle: {
            height: 75,
          },
        }}
      />
      <Drawer.Screen
        name="citiesStack"
        component={CitiesStack}
        options={({ navigation }) => {
          return {
            title: "Cities",
            headerTitle: "Explore all our Cities!",
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Pressable
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <AntDesign name="back" size={24} color="black" />
                </Pressable>
              </View>
            ),
          };
        }}
      />
      <Drawer.Screen
        name="signup"
        component={SignUp}
        options={({ navigation }) => {
          return {
            title: "Sign Up",
            headerTitle: "Create an account!",
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Pressable
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <AntDesign name="back" size={24} color="black" />
                </Pressable>
              </View>
            ),
          };
        }}
      />
      <Drawer.Screen
        name="signin"
        component={SignIn}
        options={({ navigation }) => {
          return {
            title: "Sign In",
            headerTitle: "Welcome back!",
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Pressable
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <AntDesign name="back" size={24} color="black" />
                </Pressable>
              </View>
            ),
          };
        }}
      />
    </Drawer.Navigator>
  );
};

export default NavigatorDrawer;
