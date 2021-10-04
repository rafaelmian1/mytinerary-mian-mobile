import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { ParallaxImage } from "react-native-snap-carousel";

const Slide = ({ item, index, parallaxProps, navigation, activity }) => {
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
  if (activity) {
    return (
      <Pressable key={"slide" + index} onPress={() => setLoop(!loop)}>
        <View style={styles.item}>
          <ParallaxImage
            source={{
              uri: "https://my-tinerary-mian.herokuapp.com" + item.img,
            }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          {!loop && (
            <View style={styles.textContainer}>
              <Text style={{ ...styles.brand, fontSize: 24 }} numberOfLines={2}>
                {item.name}
              </Text>
              <Text
                style={{ ...styles.brand, fontSize: 18, paddingTop: 0 }}
                numberOfLines={2}
              >
                {item.description}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    );
  }
  return (
    <Pressable
      onPress={() => {
        navigation.push("citiesStack", {
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
      <View style={styles.item}>
        <ParallaxImage
          source={{
            uri: "https://my-tinerary-mian.herokuapp.com" + item.img[indice],
          }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        {!loop && (
          <>
            <View style={styles.textContainer}>
              <Text style={styles.brand} numberOfLines={2}>
                {item.city}
              </Text>
              <Image
                source={{
                  uri: "https://static.thenounproject.com/png/949830-200.png",
                }}
                style={styles.pressable}
              />
            </View>
          </>
        )}
      </View>
    </Pressable>
  );
};
export default Slide;

const styles = StyleSheet.create({
  brand: {
    fontFamily: "Lato",
    color: "black",
    fontSize: 40,
    padding: 8,
    marginLeft: 15,
  },
  textContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(212, 201, 190, 075)",
  },
  pressable: {
    width: 50,
    height: 50,
    // position: "absolute",
    // top: 5,
    // right: 5,
  },
  item: {
    flex: 1,
    height: Dimensions.get("window").width - 80,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 10,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});
