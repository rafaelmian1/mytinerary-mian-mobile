import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TextInput, View } from 'react-native'

import { connect } from 'react-redux'
import usersActions from '../redux/actions/usersActions'
import ConfirmModal from './ConfirmModal'
import EditDeleteIcons from './EditDeleteIcons'

const Comment = ({ comm, id, userId, comments, ...props }) => {
  const [com, setCom] = useState('')
  const [comment, setComment] = useState('')
  const [editConfirm, setEditConfirm] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    setCom(comments.find((c) => c._id === comm._id).comment)
    setComment(comments.find((c) => c._id === comm._id).comment)
  }, [comments])

  const Avatar = (
    <View style={{ height: 50 }}>
      <Image
        source={{
          uri: comm.user.img,
        }}
        style={styles.avatar}
      />
    </View>
  )

  const CoreComment = (
    <View style={styles.inputContainer}>
      <View style={styles.inputContainerHeader}>
        <Text style={styles.avatarText}>{comm.user.first_name + ' ' + comm.user.last_name}</Text>
        {props.user && comm.user._id === userId && (
          <EditDeleteIcons
            editConfirm={editConfirm}
            com={com}
            comment={comment}
            setCom={setCom}
            id={id}
            setEditConfirm={setEditConfirm}
            setModalVisible={setModalVisible}
          />
        )}
      </View>
      {!editConfirm ? (
        <Text style={styles.commentStyle}>{com}</Text>
      ) : (
        <TextInput
          editable={editConfirm}
          style={styles.commentEditingStyle}
          value={com}
          onChangeText={(text) => setCom(text)}
        />
      )}
    </View>
  )
  const background = {
    backgroundColor: props.user && comm.user._id === userId ? '#ede6df' : '#bfb5aa',
  }

  return (
    <View style={[styles.mainContainer, background]}>
      {Avatar}
      {CoreComment}
      <ConfirmModal modalVisible={modalVisible} setModalVisible={setModalVisible} id={id} com={com} />
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    comments: state.activities.comments,
  }
}

const mapDispatchToProps = {
  comment: usersActions.comment,
  getId: usersActions.getId,
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    borderRadius: 25,
    marginVertical: 4,
  },
  avatar: {
    width: 50,
    marginHorizontal: 10,
    height: 50,
    borderRadius: 25,
  },
  inputContainer: {
    width: Dimensions.get('window').width * 0.8,
  },
  inputContainerHeader: {
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 25,
  },
  avatarText: {
    fontWeight: 'bold',
    fontFamily: 'LatoRegular',
    fontSize: 13,
  },
  commentStyle: {
    width: '80%',
    marginLeft: 10,
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'LatoRegular',
  },
  commentEditingStyle: {
    borderBottomWidth: 1,
    padding: 3,
    fontSize: 15,
    opacity: 0.6,
    borderBottomColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 0,
    width: '80%',
  },
})
