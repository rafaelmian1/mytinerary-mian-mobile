import React, { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import Comment from "./Comment";
import CommentsFooter from "./CommentsFooter";

const Comments = ({ itinerary, userId, ...props }) => {
  const { _id } = itinerary;
  let cant = Math.floor(
    (Dimensions.get("window").height - Dimensions.get("window").width - 80) / 78
  );
  cant = props.user ? cant - 1 : cant;

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.lastComments}>Last Comments</Text>
      <FlatList
        data={props.comments.slice(props.comments.length - cant)}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <Comment
            key={item._id}
            comm={item}
            id={_id}
            key={index}
            userId={userId}
          />
        )}
        ListFooterComponent={
          <CommentsFooter _id={_id} userId={userId} cant={cant} {...props} />
        }
      />
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    width: Dimensions.get("window").width,
    marginTop: 4,
    paddingHorizontal: 5,
  },
  lastComments: {
    fontSize: 20,
    fontFamily: "LatoRegular",
    textAlign: "center",
  },
});
