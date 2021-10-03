import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import activitiesActions from "../redux/actions/activitiesActions";
import Like from "./Like";

const Itinerary = ({ itinerary, index, ...props }) => {
  const [userId, setUserId] = useState(null);
  let fetchOnce = useRef(false);

  useEffect(() => {
    props.user && getUserId();
    // eslint-disable-next-line
  }, [props.user]);
  const handleClick = async () => {
    props.setComments(itinerary.comments);
    let response =
      !fetchOnce.current && (await props.getActivities(itinerary._id));
    fetchOnce.current = true;
    return response;
  };
  const getUserId = async () => {
    setUserId(await props.getId());
  };
  return (
    <View
      style={{
        height: 300,
        width: Dimensions.get("window").width,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <Image
        source={{
          uri: "https://my-tinerary-mian.herokuapp.com" + itinerary.img,
        }}
        style={{
          width: Dimensions.get("window").width * 0.35,
          height: 290,
          marginHorizontal: Dimensions.get("window").width * 0.02,
        }}
      />
      <View
        style={{
          height: "80%",
          width: Dimensions.get("window").width * 0.6,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri:
                "https://my-tinerary-mian.herokuapp.com" +
                itinerary.user.avatar,
            }}
            style={{
              width: 50,
              height: 50,
              marginHorizontal: 10,
              borderRadius: 25,
            }}
          />
          <Text>{itinerary.user.name}</Text>
          <Like itinerary={itinerary} userId={userId} {...props} />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            width: Dimensions.get("window").width * 0.6,
          }}
        >
          <Text>{itinerary.title}</Text>
          <Text>{itinerary.description}</Text>
          <Text>
            {itinerary.hashtags.map((ht) => (
              <Text key={ht}>#{ht} </Text>
            ))}
          </Text>
          <View style={{ flexDirection: "row" }}>
            {[...Array(5)].map((item2, i) => (
              <Image
                key={i}
                source={{
                  uri: "https://my-tinerary-mian.herokuapp.com//assets/dollar.png",
                }}
                style={{
                  width: 25,
                  height: 25,
                  opacity: i >= itinerary.price ? 0.6 : 1,
                }}
              />
            ))}
          </View>
          <Text>🕔 {itinerary.duration} hs</Text>
        </View>
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor="white"
          style={styles.buttonContainer}
          onPress={() => {
            handleClick() &&
              props.navigation.push("activity", { itinerary, userId });
          }}
        >
          <Text style={styles.button}>View More</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    activities: state.activities.activities,
  };
};

const mapDispatchToProps = {
  comment: usersActions.comment,
  getId: usersActions.getId,
  getActivities: activitiesActions.getActivities,
  setComments: activitiesActions.setComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    alignItems: "center",
    backgroundColor: "#b9a698",
  },
  buttonContainer: {
    width: "50%",
    padding: 5,
    marginLeft: "25%",
    marginTop: 30,
    backgroundColor: "#e6e1dd",
    borderRadius: 25,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
  },
  button: {
    color: "black",
    fontFamily: "Lato",
    fontSize: 16,
    textAlign: "center",
  },
  header: {
    flex: 1,
    alignItems: "center",
  },
  banner: {
    width: Dimensions.get("window").width - 30,
    height: Dimensions.get("window").width - 60,
    borderWidth: 2,
    borderColor: "white",
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
  label: { fontFamily: "Lato", fontSize: 25 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 5,
  },
  input: {
    height: "100%",
    margin: 12,
    padding: 10,
    flex: 1,
  },
});
