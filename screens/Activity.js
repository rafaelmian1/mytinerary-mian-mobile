import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Activities from "../components/Activities";
import Comments from "../components/Comments";

const Activity = (props) => {
  const { itinerary, userId } = props.route.params;
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<Activities id={itinerary._id} />}
        ListFooterComponent={
          <Comments itinerary={itinerary} userId={userId} {...props} />
        }
        ListFooterComponentStyle={{ height: 280 }}
      />
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({ container: { flex: 1 } });
