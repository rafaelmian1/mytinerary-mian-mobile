import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Cities = (props) => {
  return (
    <View>
      <Text>CITIES</Text>
      <Button
        onPress={() => props.navigation.push("itineraries")}
        title="Explore"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

export default Cities;

const styles = StyleSheet.create({});
