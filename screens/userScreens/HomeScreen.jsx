import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated } from 'react-native';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import CustomContainer from '../../components/CustomContainer';
import Title from '../../components/Title';
import PostService from '../../services/PostService';
import Post from '../../components/Post';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await PostService.getPosts();
      const postsWithCommentText = response.map((post) => ({
        ...post,
        commentText: '', // Ajouter une propriété "commentText" vide à chaque post
      }));
      setPosts(postsWithCommentText);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };



  return (
    <CustomContainer>
      <Title text="News" />

      {posts.map((post) => (
        <Post key={post.id} post={post} posts={posts} setPosts={setPosts}>
        </Post>
        
      ))}
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  
});

