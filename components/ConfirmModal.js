import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";

const ConfirmModal = ({ modalVisible, setModalVisible, id, com, comment }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
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
                { width: 50, marginHorizontal: 10, backgroundColor: "green" },
              ]}
              onPress={() => {
                setModalVisible(!modalVisible);
                comment(id, "delete", com);
              }}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>

            <Pressable
              style={[
                styles.button,
                styles.buttonClose,
                { width: 50, marginHorizontal: 10, backgroundColor: "red" },
              ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>No</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const mapDispatchToProps = {
  comment: usersActions.comment,
};

export default connect(null, mapDispatchToProps)(ConfirmModal);

const styles = StyleSheet.create({
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
