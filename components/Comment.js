import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import EditDeleteButtons from "./EditDeleteButtons";

const Comment = ({ comm, id, userId, ...props }) => {
  const [com, setCom] = useState(comm.comment);
  const [comment, setComment] = useState(comm.comment);
  const [editConfirm, setEditConfirm] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ height: 65, flexDirection: "row" }}>
      {comm && (
        <View style={{ height: 50, marginBottom: 30 }}>
          <Image
            source={{
              uri: comm.user.img,
            }}
            style={{
              width: 50,
              marginHorizontal: 10,
              height: 50,
              marginHorizontal: 10,
              borderRadius: 25,
            }}
          />
        </View>
      )}
      <View style={styles.inputContainer}>
        <View
          style={{
            width: "80%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {comm.user.first_name + " " + comm.user.last_name}
          </Text>
          {props.user && comm.user._id === userId && (
            <View style={{ flexDirection: "row" }}>
              {!editConfirm ? (
                <>
                  <Ionicons
                    name="pencil-outline"
                    size={24}
                    color="black"
                    style={{ marginHorizontal: 15 }}
                    onPress={() => setEditConfirm(!editConfirm)}
                  />
                  <Ionicons
                    name="trash-outline"
                    size={24}
                    color="black"
                    onPress={() => setModalVisible(true)}
                  />
                </>
              ) : (
                <>
                  <Ionicons
                    name="checkmark-outline"
                    size={24}
                    color="black"
                    style={{ marginHorizontal: 15 }}
                    onPress={() => {
                      setEditConfirm(!editConfirm);
                      com !== comment &&
                        props.comment(id, "update", comment, com);
                    }}
                  />
                  <Ionicons
                    name="close-outline"
                    size={24}
                    color="black"
                    onPress={() => {
                      setEditConfirm(!editConfirm);
                      setCom(comment);
                    }}
                  />
                </>
              )}
            </View>
          )}
        </View>
        {!editConfirm ? (
          <Text
            style={{
              width: "80%",
              marginLeft: 10,
            }}
          >
            {com}
          </Text>
        ) : (
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 4,
              width: "80%",
            }}
            value={com}
            onChangeText={(text) => setCom(text)}
          ></TextInput>
        )}
      </View>

      {/* <EditDeleteButtons
          authorized={comm.user._id === userId}
          functions={[editConfirmButton, deleteComment]}
        /> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to delete you comment?
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { width: 50, marginHorizontal: 10 },
                ]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  props.comment(id, "delete", com);
                }}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { width: 50, marginHorizontal: 10 },
                ]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};

const mapDispatchToProps = {
  comment: usersActions.comment,
  getId: usersActions.getId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

const styles = StyleSheet.create({
  inputContainer: {
    width: Dimensions.get("window").width - 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
