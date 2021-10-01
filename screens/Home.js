import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
  Pressable,
} from "react-native";
import { connect } from "react-redux";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Carousel from "react-native-snap-carousel";
import carouselActions from "../redux/actions/carouselActions";

const Home = (props) => {
  const [loaded] = useFonts({
    Lato: require("../assets/Lato-Light.ttf"),
  });

  useEffect(() => {
    props.slides.length === 0 && props.getSlides(props);
    // return () => props.navigation.reset();
  }, []);

  if (!loaded) {
    return <AppLoading />;
  }

  const data =
    props.slides.length !== 0
      ? [...props.slides[0], ...props.slides[1], ...props.slides[2]]
      : [];
  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          source={require("../assets/fondo.jpg")}
          style={styles.ImageBackground}
          resizeMode="cover"
        >
          <View style={styles.brandContainer}>
            <Text style={styles.brand}>
              My
              <Text style={styles.brand}>Tinerary</Text>
            </Text>
            <View style={styles.sloganContainer}>
              <Text style={{ ...styles.brand, fontSize: 25.0 }}>
                Find your perfect trip, designed by insiders who know and love
                their cities!
              </Text>
            </View>
            <Button
              onPress={() => {
                props.navigation.push("citiesStack", { bool: true });
              }}
              title="Explore"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </ImageBackground>
        {props.slides.length !== 0 && (
          <Carousel
            layout={"default"}
            data={data}
            renderItem={({ item }) => {
              return (
                <Pressable onPress={() => props.navigation.push("itineraries")}>
                  <View style={styles.ImageBackground}>
                    <ImageBackground
                      source={{
                        uri:
                          "https://my-tinerary-mian.herokuapp.com" +
                          item.img[0],
                      }}
                      style={styles.slide}
                      resizeMode="cover"
                    >
                      <Text style={styles.brand}>{item.city}</Text>
                    </ImageBackground>
                  </View>
                </Pressable>
              );
            }}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width * 0.7}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    slides: state.carousel.slides,
  };
};
const mapDispatchToProps = {
  getSlides: carouselActions.getSlides,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  ImageBackground: {
    height: Dimensions.get("window").height - 75,
    width: Dimensions.get("window").width,
  },
  brandContainer: {
    width: "100%",
    marginTop: "25%",
    paddingHorizontal: 5,
  },
  sloganContainer: {
    width: "75%",
    paddingLeft: 10,
  },
  brand: {
    fontFamily: "Lato",
    fontSize: 75,
    fontWeight: "500",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { height: 2, width: 2 },
    textShadowRadius: 5,
  },
  slide: {},
  title: {},
});
