import React, { useState, useEffect, useRef } from "react";
import { Text, View, Pressable, StyleSheet, Dimensions } from "react-native";
import { ParallaxImage } from "react-native-snap-carousel";

const Slide = ({ item, index, parallaxProps }) => {
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
  return (
    <Pressable
      onPress={() => {
        props.navigation.navigate("citiesStack", {
          screen: "itineraries",
          bool: true,
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
        <View style={styles.textContainer}>
          <Text style={styles.brand} numberOfLines={2}>
            {item.city}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
export default Slide;

const styles = StyleSheet.create({
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
  item: {
    height: Dimensions.get("window").width - 60,
    borderRadius: 20,
    overflow: "hidden",
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
