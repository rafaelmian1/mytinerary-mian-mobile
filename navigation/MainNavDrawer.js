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
import { Image, Pressable, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";

const Drawer = createDrawerNavigator();

const NavigatorDrawer = ({ resetUser, user, ...props }) => {
  useEffect(() => {
    props.validateToken();
  }, []);

  const DrawerInsta = (props) => (
    <DrawerContentScrollView {...props}>
      {user && (
        <View
          style={{
            flexDirection: "row",
            marginVertical: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: user.img }}
            style={{ width: 50, height: 50, borderRadius: 50, marginRight: 20 }}
          />
          <Text style={{ fontFamily: "Lato", fontSize: 25 }}>
            Hola {user.first_name} !
          </Text>
        </View>
      )}
      <DrawerItemList {...props} />
      {user && <DrawerItem label="Log Out" onPress={() => resetUser()} />}
    </DrawerContentScrollView>
  );

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerInsta {...props} />}>
      <Drawer.Screen
        name="home"
        component={HomeStack}
        options={{
          title: "Home",
          headerStyle: {
            height: 80,
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
            headerStyle: {
              height: 80,
            },
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
                headerStyle: {
                  height: 80,
                },
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
                headerStyle: {
                  height: 80,
                },
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
