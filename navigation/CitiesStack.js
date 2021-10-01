import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cities from "../screens/Cities";
import Itineraries from "../screens/Itineraries";
import Activity from "../screens/Activity";
import { Pressable, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const CitiesStack = (props) => {
  useEffect(() => {
    props.route.params &&
      props.route.params.bool &&
      props.navigation.getParent().setOptions({ headerShown: false });
    return () => props.navigation.getParent().setOptions({ headerShown: true });
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="cities"
        component={Cities}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="itineraries"
        component={Itineraries}
        options={({ navigation }) => {
          return {
            title: "Itineraries",
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
      <Stack.Screen
        name="activity"
        component={Activity}
        options={({ navigation }) => {
          return {
            title: "Activity bla",
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

export default CitiesStack;
