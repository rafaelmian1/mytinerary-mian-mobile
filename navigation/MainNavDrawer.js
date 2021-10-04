import React, { useEffect } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeStack from "./HomeStack";
import CitiesStack from "./CitiesStack";
import SignForm from "../screens/SignForm";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";

const Drawer = createDrawerNavigator();

const NavigatorDrawer = ({ resetUser, user, ...props }) => {
  useEffect(() => {
    props.validateToken();
  }, []);

  const DrawerInsta = (props) => (
    <DrawerContentScrollView {...props}>
      {
        <View
          style={{
            flexDirection: "row",
            marginVertical: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <>
            {user && (
              <Image
                source={{ uri: user.img }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginRight: 20,
                }}
              />
            )}
            <Text
              style={{
                fontFamily: "LatoRegular",
                fontSize: 24,
                textAlign: "center",
              }}
            >
              {user ? "Hi " + user.first_name + "!" : "MyTinerary"}
            </Text>
          </>
        </View>
      }
      <DrawerItemList {...props} />
      {user && (
        <DrawerItem
          icon={() => (
            <Ionicons name="log-out-outline" size={24} color="black" />
          )}
          label="Log Out"
          onPress={() => {
            resetUser();
            props.navigation.navigate("home");
          }}
          labelStyle={{ fontFamily: "Lato", fontSize: 18, color: "black" }}
        />
      )}
    </DrawerContentScrollView>
  );
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#F2EBEA",
          width: 240,
        },
        drawerLabelStyle: {
          color: "black",
          fontFamily: "Lato",
          fontSize: 18,
        },
        drawerActiveBackgroundColor: "rgba(185,166,152,0.3)",
        headerTitleStyle: { fontFamily: "LatoRegular", fontSize: 24 },
        headerStyle: {
          height: 80,
          backgroundColor: "#d4c9be",
        },
      }}
      drawerContent={(props) => <DrawerInsta {...props} />}
    >
      <Drawer.Screen
        name="home"
        component={HomeStack}
        options={{
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "LatoRegular",
                  fontSize: 20,
                  textAlign: "center",
                  marginRight: 15,
                }}
              >
                {user ? "Hi " + user.first_name + "!" : "MyTinerary"}
              </Text>
              {user && (
                <Image
                  source={{ uri: user.img }}
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 45,
                    marginRight: 15,
                    borderWidth: 1,
                    borderColor: "black",
                  }}
                />
              )}
            </View>
          ),
          title: "Home",
          drawerIcon: () => (
            <Ionicons name="home-outline" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="citiesStack"
        component={CitiesStack}
        options={({ navigation }) => {
          return {
            title: "Cities",
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="city-variant-outline"
                size={24}
                color="black"
              />
            ),
            headerTitle: "Explore all our Cities!",
            headerLeft: () => (
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <View style={{ marginHorizontal: 20 }}>
                  <AntDesign name="back" size={24} color="black" />
                </View>
              </Pressable>
            ),
          };
        }}
      />
      {!user && (
        <>
          <Drawer.Screen
            name="signup"
            component={SignForm}
            options={({ navigation }) => {
              return {
                title: "Sign Up",
                headerTitle: "Create an account!",
                drawerIcon: () => (
                  <Ionicons name="person-add-outline" size={24} color="black" />
                ),
                headerLeft: () => (
                  <View style={{ marginHorizontal: 20 }}>
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
            component={SignForm}
            options={({ navigation }) => {
              return {
                title: "Sign In",
                headerTitle: "Welcome back!",
                drawerIcon: () => (
                  <Ionicons name="log-in-outline" size={24} color="black" />
                ),
                headerLeft: () => (
                  <View style={{ marginHorizontal: 20 }}>
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
        </>
      )}
    </Drawer.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};
const mapDispatchToProps = {
  validateToken: usersActions.validateToken,
  resetUser: usersActions.resetUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(NavigatorDrawer);
