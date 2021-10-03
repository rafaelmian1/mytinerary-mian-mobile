import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Comment from "../components/Comment";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import activitiesActions from "../redux/actions/activitiesActions";

const AllComments = (props) => {
  const { _id, userId } = props.route.params;
  const [com, setCom] = useState("");
  const handleComment = async () => {
    // !props.user &&
    //   toast.error("You must be logged in to comment", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: true,
    //     progress: undefined,
    //   });
    if (com && props.user) {
      const c = {
        user: {
          _id: userId,
          img: props.user.img,
          first_name: props.user.first_name,
          last_name: props.user.last_name,
        },
        comment: com,
      };
      props.setComments([...props.comments, c]);
      await props.comment(_id, "post", com);
      //   autoScroll.current.scrollTo(0, autoScroll.current.scrollHeight);
      setCom("");
    }
  };
  return (
    <View style={{ alignItems: "center", flex: 1, marginTop: 10 }}>
      <View style={{ flex: 1, padding: 5 }}>
        <FlatList
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
    width: "90%",
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
