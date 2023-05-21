import React from 'react';
import moment from 'moment';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import emptyPhoto from './../assets/images/empty_photo.png';

export default function PostViewComment({ showComments, post, onPress }) {
    return (
      <>
        {showComments && post.comments.length > 0 && (
            <ScrollView contentContainerStyle={styles.commentsContainer}>
            {post.comments.map((comment, index) => (
                <View key={index} style={styles.commentContainer}>
                <View style={styles.postHeader}>
                <Image
                  source={
                    post.user.photoURL=='' ? { uri: post.user.photoURL } : emptyPhoto
                  }
                  style={styles.userPhoto}
                />
                <Text style={styles.postUser}>{post.user.displayName}</Text>
              </View>
                <Text style={styles.commentContent}>{comment.content}</Text>
                <Text style={styles.commentDate}>
                    {moment(comment.createdAt).format('DD/MM/YYYY HH:mm')}
                </Text>
                </View>
            ))}
            <TouchableOpacity style={styles.closeIconContainer} onPress={onPress}>
                <SimpleLineIcons name="arrow-up" size={24} color="#900C3F" />
            </TouchableOpacity>
            </ScrollView>
        )}
      </>
    );
}

const styles = StyleSheet.create({
  commentContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  postUser: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentUsername: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentContent: {
    fontSize: 16,
    flex:1
  },
  commentDate: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'right',
  },
  closeIconContainer: {
    alignItems: 'center',
  },
  userPhoto: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  }
});
