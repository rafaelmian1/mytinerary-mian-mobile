import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Itineraries = (props) => {
  useEffect(() => {
    props.navigation.getParent().setOptions({ headerShown: false });
    return () => props.navigation.getParent().setOptions({ headerShown: true });
  }, []);
  return (
    <View>
      <Text>ITINERARIES</Text>
      <Button
        onPress={() => props.navigation.push("activity")}
        title="Explore"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

export default Itineraries;

const styles = StyleSheet.create({});
