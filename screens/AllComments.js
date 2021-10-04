import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Comment from "../components/Comment";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import activitiesActions from "../redux/actions/activitiesActions";
import Toast from "react-native-toast-message";

const AllComments = (props) => {
  const { _id, userId } = props.route.params;
  const [com, setCom] = useState("");
  const handleComment = async () => {
    if (com && props.user) {
      const c = {
        user: {
          _id: userId,
          img: props.user.img,
          first_name: props.user.first_name,
          last_name: props.user.last_name,
        },
        comment: com,
        _id: "asdasdasd312321" + Math.floor(Math.random() * 999),
      };
      props.setComments([...props.comments, c]);
      setCom("");
      await props.comment(_id, "post", com);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#b9a698",
      }}
    >
      <View
        style={{
          flex: 1,
          width: Dimensions.get("window").width,
          paddingHorizontal: 6,
          paddingVertical: 3,
        }}
      >
        <FlatList
          keyboardShouldPersistTaps="always"
          data={props.comments}
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
        />
      </View>
      <Pressable
        onPress={() =>
          !props.user &&
          Toast.show({
            type: "info",
            text1: "Oops!",
            text2: "You must be logged in to like a post",
            topOffset: 100,
            onPress: () => Toast.hide(),
          })
        }
      >
        <View style={styles.inputContainer}>
          <TextInput
            editable={props.user ? true : false}
            style={styles.input}
            value={com}
            onChangeText={(text) => setCom(text)}
            placeholder="Leave us a comment"
            placeholderTextColor="black"
          />
          <Feather
            onPress={() => handleComment()}
            name="send"
            size={24}
            color="black"
            style={{ marginRight: 15 }}
          />
        </View>
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
  setComments: activitiesActions.setComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllComments);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
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
