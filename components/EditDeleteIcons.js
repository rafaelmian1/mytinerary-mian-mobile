import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import { Ionicons } from "@expo/vector-icons";

const EditDeleteIcons = ({
  editConfirm,
  com,
  comment,
  setCom,
  setEditConfirm,
  updateCom,
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {!editConfirm ? (
        <>
          <Ionicons
            name="pencil-outline"
            size={20}
            color="black"
            onPress={() => setEditConfirm(!editConfirm)}
          />
          <Ionicons
            name="trash-outline"
            size={20}
            color="black"
            onPress={() => setModalVisible(true)}
            style={{ marginHorizontal: 15 }}
          />
        </>
      ) : (
        <>
          <Ionicons
            name="checkmark-outline"
            size={20}
            color="black"
            onPress={() => {
              setEditConfirm(!editConfirm);
              com !== comment && updateCom(id, "update", comment, com);
            }}
          />
          <Ionicons
            style={{ marginHorizontal: 15 }}
            name="close-outline"
            size={20}
            color="black"
            onPress={() => {
              setEditConfirm(!editConfirm);
              setCom(comment);
            }}
          />
        </>
      )}
    </View>
  );
};
const mapDispatchToProps = {
  updateCom: usersActions.comment,
};

export default connect(null, mapDispatchToProps)(EditDeleteIcons);
