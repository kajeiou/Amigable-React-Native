import React, { useState, useEffect,  } from 'react';
import { RefreshControl } from 'react-native';
import CustomContainer from '../../../components/CustomContainer';
import PostService from '../../../services/PostService';
import Post from '../../../components/Post';

export default function PublicPostsScreen() {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
      fetchPosts();
    }, []);
    
    const fetchPosts = async () => {
      try {
        const response = await PostService.getPosts();
        const postsWithCommentText = response.map((post) => ({
          ...post,
          commentText: '',
        }));
        setPosts(postsWithCommentText);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    
    const handleRefresh = () => {
      setRefreshing(true);
      fetchPosts()
        .then(() => setRefreshing(false))
        .catch((error) => {
          console.error('Error refreshing posts:', error);
          setRefreshing(false);
        });
    };
    
    return (
    <CustomContainer refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#900C3F"/>}>
      
        {posts.map((post) => (
          <Post key={post.id} post={post} posts={posts} setPosts={setPosts} />
        ))}
    </CustomContainer>
    );
}
