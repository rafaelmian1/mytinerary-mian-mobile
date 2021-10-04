import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import CitiesStack from "./CitiesStack";
import { BlurView } from "expo-blur";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="citiesStack"
        component={CitiesStack}
        options={({ navigation }) => {
          return {
            headerTitleStyle: { fontFamily: "LatoRegular", fontSize: 24 },
            headerStyle: {
              height: 80,
              backgroundColor: "#d4c9be",
            },
            title: "Explore all our Cities!",
            headerLeft: () => (
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <View style={{ marginRight: 20 }}>
                  <AntDesign name="back" size={24} color="black" />
                </View>
              </Pressable>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
