import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Image,  TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import { Ionicons, FontAwesome,  } from '@expo/vector-icons';
import PostService from './../services/PostService';
import { useAuthentication } from './../contexts/useAuthentification';
import PostComment from './PostComment';
import emptyPhoto from './../assets/images/empty_photo.png';

export default function Post({ post, posts, setPosts }) {
    const likeAnimationsRef = useRef({});

    const user = useAuthentication();
    const lastTapRef = useRef(null);

    const handleDoubleTap = (postId) => {
        const doubleTapDelay = 300; // 300 milliseconds
        const now = Date.now();
        const lastTap = lastTapRef.current;
        lastTapRef.current = now;

        if (lastTap && now - lastTap < doubleTapDelay) {
        toggleLikePost(postId); // Double tap, toggle like

        }
    };
  

  const toggleLikePost = async (postId) => {
    try {  
      const post = posts.find((post) => post.id === postId);
      startLikeAnimation(postId);
  
      await PostService.likePost(postId);
  
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.likes.includes(user.user.uid)
              ? post.likes.filter((likeId) => likeId !== user.user.uid)
              : [...post.likes, user.user.uid],
          };
        }
        return post;
      });
  
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  

  const startLikeAnimation = (postId) => {
    const animation = new Animated.Value(0);
    const updatedLikeAnimations = { ...likeAnimationsRef.current };
    updatedLikeAnimations[postId] = animation;
    likeAnimationsRef.current = updatedLikeAnimations;
  
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true, // Utiliser le pilote natif pour l'animation
    }).start(() => {
      // Animation terminée, réinitialiser l'animation
      const updatedLikeAnimations = { ...likeAnimationsRef.current };
      delete updatedLikeAnimations[postId];
      likeAnimationsRef.current = updatedLikeAnimations;
    });
  };
  
  return (
    <TouchableWithoutFeedback key={post.id} onPress={() => handleDoubleTap(post.id)}>
      <View style={styles.post}>
        <View style={styles.postHeader}>
        <Image
          source={
            post.user.photoURL==''
              ? { uri: post.user.photoURL }
              : emptyPhoto
          }
          style={styles.userPhoto}
        />
          <Text style={styles.postUser}>{post.user.displayName}</Text>
        </View>
        <Text style={styles.postContent}>{post.content}</Text>
        <View style={styles.likesCommentsContainer}>
          <View style={styles.likesContainer}>
            <TouchableOpacity onPress={() => toggleLikePost(post.id)}>
            {user && user.user && post.likes.includes(user.user.uid) ? (
                <Animated.View
                    style={[
                    {
                        transform: [
                        {
                            scale: likeAnimationsRef.current[post.id]
                            ? likeAnimationsRef.current[post.id].interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [1, 2, 1],
                                })
                            : 1,
                        },
                        ],
                    },
                    ]}
                >
                  <Ionicons name="heart" size={24} color="#900C3F" />
                </Animated.View>
            ) : (
                <Ionicons name="heart-outline" size={24} color="#900C3F" />
            )}


            </TouchableOpacity>
            <Text style={styles.likesText}>{post.likes.length}</Text>
          </View>
          <View style={styles.commentsContainer}>
            <Text style={styles.likesText}>
              <FontAwesome name="comments" size={24} color="#900C3F" /> {post.comments.length}
            </Text>
          </View>
        </View>
        <PostComment post={post} posts={posts} setPosts={setPosts}>

        </PostComment>
        
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  post: {
    width: '95%',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    marginTop: 16,
    padding: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userPhoto: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  postUser: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postContent: {
    marginBottom: 8,
  },
  likesCommentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    marginLeft: 8,
  },

});
