import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";

const CommentsFooter = ({ _id, userId, cant, ...props }) => {
  return (
    <View>
      {props.comments.length > cant && (
        <Pressable
          style={{ alignSelf: "center", marginTop: 10 }}
          onPress={() =>
            props.navigation.push("allComments", {
              _id,
              userId,
            })
          }
        >
          <Text>View the {props.comments.length} comments...</Text>
        </Pressable>
      )}
      <Pressable
        style={{
          marginTop:
            ((Dimensions.get("window").height -
              Dimensions.get("window").width -
              80) %
              78) *
            3,
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
        }}
        onPress={() =>
          props.navigation.push("allComments", {
            _id,
            userId,
          })
        }
      >
        {props.user && (
          <>
            <Image
              source={{ uri: props.user.img }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "black",
                marginRight: 10,
              }}
            />
            <Text
              style={{
                width: "75%",
                paddingBottom: 2,
                borderBottomColor: "black",
                borderBottomWidth: 1,
              }}
            >
              {" " + "Add a comment..."}
            </Text>
          </>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentsFooter);

const styles = StyleSheet.create({});
