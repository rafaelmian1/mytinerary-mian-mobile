import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const City = ({ item, index, ...props }) => {
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
        props.navigation.push("itineraries", { city: item });
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
          marginLeft: 10,
        }}
        source={{
          uri: "https://my-tinerary-mian.herokuapp.com" + item.img[indice],
        }}
      >
        {!loop && (
          <View style={styles.textContainer}>
            <Text style={styles.brand} numberOfLines={2}>
              {item.city}
            </Text>
          </View>
        )}
      </ImageBackground>
    </Pressable>
  );
};

export default City;

const styles = StyleSheet.create({
  banner: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").width - 150,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "black",
    marginVertical: 15,
  },
  brand: {
    fontFamily: "Lato",
    fontWeight: "500",
    color: "black",
    fontSize: 40,
    padding: 8,
    marginLeft: 15,
  },
  textContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    backgroundColor: "rgba(212, 201, 190, 0.8)",
    flexDirection: "row",
    borderTopWidth: 2,
  },
});
