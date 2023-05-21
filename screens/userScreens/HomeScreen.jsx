import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, Text, Image, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated } from 'react-native';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import CustomContainer from '../../components/CustomContainer';
import Title from '../../components/Title';
import PostService from '../../services/PostService';
import { useAuthentication } from '../../contexts/useAuthentification';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [likeAnimations, setLikeAnimations] = useState({});
  const user = useAuthentication();
  const lastTapRef = useRef(null);

  useEffect(() => {
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

    fetchPosts();
  }, []);

  const handleDoubleTap = (postId) => {
    const doubleTapDelay = 300; // 300 milliseconds

    const now = Date.now();
    const lastTap = lastTapRef.current;
    lastTapRef.current = now;

    if (lastTap && now - lastTap < doubleTapDelay) {
      toggleLikePost(postId); // Double tap, toggle like
      startLikeAnimation(postId); // Démarrer l'animation de like
    }
  };

  const toggleLikePost = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const liked = post.likes.includes(user.user.uid);
        const updatedLikes = liked
          ? post.likes.filter((userId) => userId !== user.user.uid)
          : [...post.likes, user.user.uid];
  
        startLikeAnimation(postId); // Démarrer l'animation de like
  
        return {
          ...post,
          likes: updatedLikes,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };
  

  const startLikeAnimation = (postId) => {
    const animation = new Animated.Value(0);
    const updatedLikeAnimations = { ...likeAnimations, [postId]: animation };
    setLikeAnimations(updatedLikeAnimations);

    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      // Animation terminée, réinitialiser l'animation
      const updatedLikeAnimations = { ...likeAnimations };
      delete updatedLikeAnimations[postId];
      setLikeAnimations(updatedLikeAnimations);
    });
  };

  const handleCommentChange = (postId, text) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          commentText: text, // Mettre à jour le texte du commentaire pour le post spécifique
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handlePostComment = (postId) => {
    const post = posts.find((post) => post.id === postId);
    if (post && post.commentText) {
      // Handle posting the comment
      console.log('Comment posted:', post.commentText);
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            commentText: '', // Réinitialiser le texte du commentaire après l'envoi
          };
        }
        return post;
      });
      setPosts(updatedPosts);
    }
  };

  return (
    <CustomContainer>
      <Title text="News" />

      {posts.map((post) => (
        <TouchableWithoutFeedback key={post.id} onPress={() => handleDoubleTap(post.id)}>
          <View style={styles.post}>
            <View style={styles.postHeader}>
              <Image
                source={
                  post.user.photoURL == ''
                    ? { uri: post.user.photoURL }
                    : require('../../assets/images/empty_photo.png')
                }
                style={styles.userPhoto}
              />
              <ImageBackground
                source={require('../../assets/images/empty_photo.png')}
                resizeMode="cover"
                style={styles.image}
              ></ImageBackground>
              <Text style={styles.postUser}>{post.user.displayName}</Text>
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
            <View style={styles.likesCommentsContainer}>
              <View style={styles.likesContainer}>
                <TouchableOpacity onPress={() => toggleLikePost(post.id)}>
                  {post.likes.includes(user.user.uid) ? (
                    <Animated.View
                      style={[
                        {
                          transform: [
                            {
                              scale: likeAnimations[post.id]
                                ? likeAnimations[post.id].interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [1, 1.5, 1],
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
            <View style={styles.commentContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Écris lui quelque chose..."
                value={post.commentText}
                onChangeText={(text) => handleCommentChange(post.id, text)}
                onSubmitEditing={() => handlePostComment(post.id)}
              />
              <TouchableOpacity onPress={() => handlePostComment(post.id)}>
                <Feather name="send" size={24} color="#900C3F" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  post: {
    width: '80%',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postUser: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postContent: {
    marginBottom: 10,
  },
  likesCommentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    marginLeft: 5,
  },
  commentsContainer: {
    marginLeft: 20,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
  },
});
