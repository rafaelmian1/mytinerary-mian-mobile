import React, { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { connect } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";
import { Ionicons } from "@expo/vector-icons";
import City from "../components/City";

const Cities = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.cities.length === 0 && props.getCities(props);
    setTimeout(() => setLoading(false), 1000);
    return () => props.resetFilteredCities();
    // eslint-disable-next-line
  }, []);

  const headerComponent = (
    <View style={{ width: Dimensions.get("window").width }}>
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
            onChangeText={(text) =>
              props.filterCities(text.trim().toLowerCase())
            }
            placeholder="Search by cities..."
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
    </View>
  );

  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <FlatList
        data={props.filteredCities}
        ListEmptyComponent={
          loading && (
            <View style={styles.container}>
              <ActivityIndicator size="large" color="#ff7f50" />
            </View>
          )
        }
        ListFooterComponent={
          props.filteredCities.length === 0 &&
          !loading && (
            <ImageBackground
              source={{
                uri: "https://my-tinerary-mian.herokuapp.com/assets/oops.png",
              }}
              style={{
                height: 100,
                width: 260,
                marginBottom: 20,
                alignSelf: "center",
              }}
            />
          )
        }
        renderItem={({ item, index }) => {
          return <City {...props} item={item} index={index} />;
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
    alignItems: "center",
    backgroundColor: "#b9a698",
  },
  header: {
    flex: 1,
    alignItems: "center",
  },
  banner: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").width - 210,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "black",
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
  label: { fontFamily: "LatoRegular", fontSize: 28, marginVertical: 10 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 5,
    marginBottom: 20,
    backgroundColor: "#d4c9be",
  },
  input: {
    height: "100%",
    margin: 12,
    padding: 10,
    flex: 1,
    fontFamily: "LatoRegular",
    fontSize: 18,
  },
});
