import React, { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import Carousel from "react-native-snap-carousel";
import carouselActions from "../redux/actions/carouselActions";
import Slide from "../components/Slide";
import { TouchableHighlight } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

const Home = (props) => {
  const carouselRef = useRef(null);
  const [firstScroll, setFirstScroll] = useState(false);

  useEffect(() => {
    props.slides.length === 0 && props.getSlides(props);
    // return () => props.navigation.reset();
  }, []);

  const data =
    props.slides.length !== 0
      ? [...props.slides[0], ...props.slides[1], ...props.slides[2]]
      : [];

  const handleFirstScroll = () => {
    if (firstScroll) return false;
    Toast.show({
      type: "info",
      // text1: "Check it!",
      text2: "You can hold the carousel images to change them!",
      topOffset: 100,
      onPress: () => Toast.hide(),
    });
    setFirstScroll(true);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#b9a698" }}>
      <ScrollView onScrollEndDrag={() => !firstScroll && handleFirstScroll()}>
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

            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="#b9a698"
              style={styles.buttonContainer}
              onPress={() => {
                props.navigation.navigate("citiesStack", {
                  screen: "cities",
                  bool: true,
                });
              }}
            >
              <Text style={styles.button}>Explore</Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>

        <View style={{ alignItems: "center", marginTop: 15 }}>
          <Text style={{ ...styles.brand, fontSize: 40 }}>
            Popular MyTineraries
          </Text>
        </View>
        {props.slides.length === 0 ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#ff7f50" />
          </View>
        ) : (
          <View style={styles.container}>
            <Carousel
              ref={carouselRef}
              hasParallaxImages={true}
              data={data}
              renderItem={({ item, index }, parallaxProps) => {
                return (
                  <Slide
                    item={item}
                    index={index}
                    parallaxProps={parallaxProps}
                    navigation={props.navigation}
                  />
                );
              }}
              sliderHeight={Dimensions.get("window").width}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={Dimensions.get("window").width - 60}
            />
          </View>
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
    height: Dimensions.get("window").height - 150,
    width: Dimensions.get("window").width,
  },
  brandContainer: {
    width: "100%",
    marginTop: "15%",
    paddingHorizontal: 3,
  },
  sloganContainer: {
    width: "75%",
    paddingLeft: 10,
  },
  brand: {
    fontFamily: "Lato",
    fontSize: 75,
    color: "#e6e1dd",
    textShadowColor: "black",
    textShadowOffset: { height: 2, width: 2 },
    textShadowRadius: 5,
  },
  container: {
    flex: 1,
    marginTop: 30,
  },
  buttonContainer: {
    width: 200,
    padding: 10,
    marginLeft: "15%",
    marginTop: 30,
    backgroundColor: "#d4c9be",
    borderRadius: 25,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
  },
  button: {
    color: "black",
    fontFamily: "Lato",
    fontSize: 40,
    textAlign: "center",
  },
});
