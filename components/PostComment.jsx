import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import PostService from '../services/PostService';
import PostViewComment from './PostViewComment';

export default function PostComment({ post, posts, setPosts }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (text) => {
    setCommentText(text);
  };

  const handlePostComment = async (postId) => {
    if (commentText.trim() !== '') {
      try {
        const updatedPost = await PostService.addCommentToPost(postId, commentText);
        const updatedPosts = posts.map((p) => (p.id === postId ? updatedPost : p));
        setPosts(updatedPosts);
        setCommentText('');
      } catch (error) {
        console.log("[PostComment] Erreur lors de l'ajout du commentaire :", error.message);
      }
    }
  };

  const handleToggleComments = () => {
    setShowComments((prevState) => !prevState);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleToggleComments} style={styles.viewCommentsButton}>
        <Text style={styles.viewCommentsButtonText}>
          {showComments ? 'Cacher les commentaires' : 'Voir les '+ post.comments.length +' commentaires'}
          
        </Text>
      </TouchableOpacity>
      
      {post.comments ? <PostViewComment showComments={showComments} post={post} onPress={handleToggleComments} comments={post.comments} /> : ''}
      
      <View style={styles.commentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Écris lui quelque chose..."
          value={commentText}
          onChangeText={handleCommentChange} // Updated this line
          onSubmitEditing={() => handlePostComment(post.id)}
        />
        <TouchableOpacity onPress={() => handlePostComment(post.id)}>
          <Feather name="send" size={24} color="#900C3F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    paddingTop: 8,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    marginRight: 8,
  },
  viewCommentsButton: {
    marginVertical: 8,
    alignItems: 'center',
    padding: 6,
  },
  viewCommentsButtonText: {
    color: '#900C3F',
    fontWeight: 'bold',
  },


});
