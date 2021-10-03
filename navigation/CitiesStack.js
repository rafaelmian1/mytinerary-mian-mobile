import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cities from "../screens/Cities";
import Itineraries from "../screens/Itineraries";
import Activity from "../screens/Activity";
import { Pressable, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AllComments from "../screens/AllComments";

const Stack = createNativeStackNavigator();

const CitiesStack = (props) => {
  useEffect(() => {
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
        initialParams={{ city: props.route.params.city }}
        options={({ navigation }) => {
          return {
            title: props.route.params.city.city,
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
        initialParams={({ route }) => route.params.itinerary}
        options={({ navigation, route }) => {
          return {
            title: route.params.itinerary.title,
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
        name="allComments"
        component={AllComments}
        initialParams={props.route.params.comments}
        options={({ navigation }) => {
          return {
            title: "Comments",
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
