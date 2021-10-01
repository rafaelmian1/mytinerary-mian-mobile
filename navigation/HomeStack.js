import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import CitiesStack from "./CitiesStack";

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
        params={({ route }) => {
          return { bool: route.params.bool };
        }}
        options={({ navigation }) => {
          return {
            title: "Cities",
            headerTitle: "Explore all our Cities!",
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
