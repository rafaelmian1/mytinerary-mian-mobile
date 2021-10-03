import React, { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import Comment from "./Comment";

const Comments = ({ itinerary, userId, ...props }) => {
  let { _id } = itinerary;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text style={{ fontSize: 30, marginBottom: 15, fontFamily: "Lato" }}>
        Last Comments
      </Text>
      <View style={{ flex: 1, width: Dimensions.get("window").width }}>
        <FlatList
          data={props.comments.slice(props.comments.length - 2)}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <Comment
              key={"comment" + index}
              comm={item}
              id={_id}
              key={index}
              userId={userId}
            />
          )}
        />
        <Pressable
          style={{ alignSelf: "center" }}
          onPress={() =>
            props.navigation.push("allComments", {
              _id,
              userId,
            })
          }
        >
          <Text>View the {props.comments.length} comments...</Text>
        </Pressable>
      </View>
      <Pressable
        style={{
          marginBottom: 20,
          marginLeft: 30,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
        }}
        onPress={() =>
          props.navigation.push("allComments", {
            _id,
            userId,
          })
        }
      >
        {props.user && (
          <Image
            source={{ uri: props.user.img }}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              marginRight: 10,
            }}
          />
        )}
        <Text>
          {props.user ? "Add a comment..." : "Log in to add a comment"}
        </Text>
      </Pressable>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    comments: state.activities.comments,
  };
};

const mapDispatchToProps = {
  comment: usersActions.comment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
