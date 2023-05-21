import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getUserFromAsyncStorage } from '../utils/AsyncStorageUtil';
import { Post } from '../classes/Post';
import UserService from '../services/UserService';

const firestore = getFirestore();

const PostService = {
  createPost: async (content,imageURL,isPublic) => {
    try {
        const user = await getUserFromAsyncStorage();
    
        const post = {
            id:null,
            content: content,
            userId: user.uid,
            createdAt: new Date().toISOString(),
            likes: [],
            comments: [],
            imageURL:imageURL,
            isPublic:isPublic,
            attachments: [],
            isEdited: false
        };
    
        const postRef = await addDoc(collection(firestore, 'posts'), post, { merge: true });
        return postRef.id;
      } catch (error) {
        console.log('Erreur lors de la création du post :', error.message);
        throw error;
      }
  },

  getPosts: async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'posts'));
      const posts = [];
  
      const userPromises = [];
      for (const doc of querySnapshot.docs) {
        const userPromise = UserService.getUserById(doc.data().userId);
        userPromises.push(userPromise);
      }
  
      const users = await Promise.all(userPromises);
  
      for (let i = 0; i < querySnapshot.docs.length; i++) {
        const doc = querySnapshot.docs[i];
        const user = users[i];
  
        const post = new Post(
          doc.id,
          doc.data().content,
          doc.data().userId,
          doc.data().createdAt,
          doc.data().likes,
          doc.data().comments,
          doc.data().imageURL,
          doc.data().isPublic,
          doc.data().attachments,
          doc.data().isEdited,
          user
        );
  
        posts.push(post);
      }
  
      return posts;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },
  

  updatePost: async (postId, updatedData) => {
    try {
      const postRef = doc(firestore, 'posts', postId);
      await updateDoc(postRef, updatedData);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  },

  deletePost: async (postId) => {
    try {
      await deleteDoc(doc(firestore, 'posts', postId));
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  },
};

export default PostService;
