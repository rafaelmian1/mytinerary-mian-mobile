import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { connect } from "react-redux";
import Slide from "../components/Slide";

const Activities = ({ id, ...props }) => {
  const [act, setAct] = useState([]);
  useEffect(() => {
    props.activities &&
      setAct(
        props.activities.find(
          (activities) =>
            activities.length > 0 && activities[0].itinerary === id
        )
      );
  }, [props.activities]);
  return (
    <View style={styles.container}>
      <Carousel
        layout={"default"}
        layoutCardOffset={18}
        hasParallaxImages={true}
        data={act || []}
        renderItem={({ item, index }, parallaxProps) => {
          return (
            <Slide
              item={item}
              index={index}
              parallaxProps={parallaxProps}
              navigation={props.navigation}
              activity={true}
            />
          );
        }}
        sliderHeight={Dimensions.get("window").width}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width - 60}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    activities: state.activities.activities,
  };
};

export default connect(mapStateToProps)(Activities);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
