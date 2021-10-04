import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";
import itinerariesActions from "../redux/actions/itinerariesActions";
import Itinerary from "../components/Itinerary";

const Itineraries = (props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    props.navigation.getParent().setOptions({ headerShown: false });
    return () => props.navigation.getParent().setOptions({ headerShown: true });
  }, []);
  useEffect(() => {
    let myListener = props.navigation.addListener("focus", () => {
      props.getItineraries(props.route.params.city._id);
      setLoading(false);
    });
    return () => {
      props.navigation.removeListener(myListener);
      props.resetState();
      props.resetCity();
    };
    // eslint-disable-next-line
  }, []);

  const headerComponent = (
    <View style={styles.header}>
      <Image
        source={{
          uri:
            "https://my-tinerary-mian.herokuapp.com" +
            props.route.params.city.img[4],
        }}
        style={styles.banner}
      />
      <Text style={styles.label}>
        WELCOME TO {props.route.params.city.city.toUpperCase()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={props.itineraries}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <View
            style={{
              ...styles.container,
              marginTop: Dimensions.get("window").height * 0.15,
            }}
          >
            <ActivityIndicator size="large" color="#ff7f50" />
          </View>
        }
        ListFooterComponent={
          props.itineraries &&
          props.itineraries.length === 0 && (
            <ImageBackground
              source={{
                uri: "https://my-tinerary-mian.herokuapp.com/assets/oops.png",
              }}
              style={styles.oops}
            />
          )
        }
        ListHeaderComponent={headerComponent}
        renderItem={({ item, index }) => {
          return (
            <Itinerary itinerary={item} {...props} index={index} key={index} />
          );
        }}
      />
    </View>
  );
};

const mapDispatchToProps = {
  getItineraries: itinerariesActions.getItineraries,
  resetState: itinerariesActions.resetState,
  resetCity: citiesActions.resetCity,
};

const mapStateToProps = (state) => {
  return {
    itineraries: state.itineraries.itineraries,
    cities: state.cities.cities,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    alignItems: "center",
    backgroundColor: "#b9a698",
  },
  buttonContainer: {
    width: 100,
    padding: 10,
    marginLeft: "15%",
    marginTop: 30,
    backgroundColor: "#e6e1dd",
    borderRadius: 25,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
  },
  button: {
    color: "black",
    fontFamily: "Lato",
    fontSize: 20,
    textAlign: "center",
  },
  header: {
    flex: 1,
  },
  banner: {
    width: Dimensions.get("window").width - 10,
    height: Dimensions.get("window").width - 140,
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden",
    borderRadius: 15,
    padding: 5,
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
  label: { fontFamily: "LatoRegular", fontSize: 30, textAlign: "center" },
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
  oops: {
    height: 100,
    width: 260,
    marginTop: 50,
    alignSelf: "center",
  },
});
