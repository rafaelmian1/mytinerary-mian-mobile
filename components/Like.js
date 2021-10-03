import usersActions from "../redux/actions/usersActions";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LikesAndComments = ({ itinerary, userId, ...props }) => {
  const [stopper, setStopper] = useState(true);
  const [likes, setLikes] = useState(itinerary.likes.likes);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    setLiked(itinerary.likes.users.includes(userId));
    // eslint-disable-next-line
  }, [userId]);
  const clickHandler = async (bool) => {
    if (!stopper) {
      return false;
    }
    if (!props.user) {
      //   toast.error("You must be logged in to like the itineraries", {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: false,
      //     draggable: true,
      //     progress: undefined,
      //   });
      return false;
    }
    setStopper(false);
    let response = await props.like(bool, itinerary._id);

    if (response.success) {
      if (bool) {
        setLikes(likes + 1);
        setLiked(bool);
      } else {
        setLikes(likes - 1);
        setLiked(bool);
      }
      setStopper(true);
    }
  };

  return (
    <>
      {liked ? (
        // eslint-disable-next-line
        <Pressable
          onPress={() => stopper && clickHandler(!liked)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            right: 15,
          }}
        >
          <Ionicons name={"heart-sharp"} size={30} color="red" />
          <Text style={{ color: "red", fontSize: 16 }}>{likes}</Text>
        </Pressable>
      ) : (
        // eslint-disable-next-line
        <Pressable
          onPress={() => stopper && clickHandler(!liked)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            right: 15,
          }}
        >
          <Ionicons name="heart-outline" size={30} color="red" />
          <Text style={{ color: "red", fontSize: 16 }}>{likes}</Text>
        </Pressable>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};

const mapDispatchToProps = {
  like: usersActions.like,
};

export default connect(mapStateToProps, mapDispatchToProps)(LikesAndComments);
