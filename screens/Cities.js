import React, { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { connect } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";
import { Ionicons } from "@expo/vector-icons";

const Cities = (props) => {
  const [indice, setIndice] = useState(0);
  const interval = useRef(null);
  const [loop, setLoop] = useState(false);
  useEffect(() => {
    if (loop) {
      interval.current = setTimeout(
        () => setIndice(indice === 3 ? 0 : indice + 1),
        2000
      );
    }
    return () => clearTimeout(interval.current);
  });

  useEffect(() => {
    props.cities.length === 0 && props.getCities(props);

    return () => props.resetFilteredCities();
    // eslint-disable-next-line
  }, []);

  const headerComponent = (
    <View style={styles.header}>
      <Image
        source={{
          uri: "https://www.diabetes.co.uk/wp-content/uploads/2019/01/iStock-10019278401.jpg",
        }}
        style={styles.banner}
      />
      <Text style={styles.label}>Find what you're looking for</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => props.filterCities(text.trim().toLowerCase())}
          placeholder="Search by cities"
          placeholderTextColor="black"
        />
        <Ionicons
          style={{ paddingRight: 15 }}
          name="search-outline"
          size={24}
          color="black"
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={props.filteredCities}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              onPress={() => {
                props.navigation.navigate("citiesStack", {
                  screen: "itineraries",
                  bool: true,
                  city: item,
                });
              }}
              key={"slide" + index}
              onLongPress={() => {
                setIndice(indice === 3 ? 0 : indice + 1);
                setLoop(true);
              }}
              onPressOut={() => setLoop(false)}
            >
              <ImageBackground
                style={{
                  ...styles.banner,
                  justifyContent: "flex-end",
                  overflow: "hidden",
                }}
                source={{
                  uri:
                    "https://my-tinerary-mian.herokuapp.com" + item.img[indice],
                }}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.brand} numberOfLines={2}>
                    {item.city}
                  </Text>
                </View>
              </ImageBackground>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={headerComponent}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    cities: state.cities.cities,
    filteredCities: state.cities.filteredCities,
  };
};
const mapDispatchToProps = {
  getCities: citiesActions.getCities,
  filterCities: citiesActions.filterCities,
  resetFilteredCities: citiesActions.resetFilteredCities,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    alignItems: "center",
    backgroundColor: "#b9a698",
  },
  header: {
    flex: 1,
    alignItems: "center",
  },
  banner: {
    width: Dimensions.get("window").width - 30,
    height: Dimensions.get("window").width - 60,
    borderWidth: 2,
    borderColor: "white",
    marginVertical: 15,
  },
  brand: {
    fontFamily: "Lato",
    fontWeight: "500",
    color: "white",
    fontSize: 40,
    padding: 8,
    marginLeft: 15,
  },
  textContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  label: { fontFamily: "Lato", fontSize: 25 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 5,
  },
  input: {
    height: "100%",
    margin: 12,
    padding: 10,
    flex: 1,
  },
});
