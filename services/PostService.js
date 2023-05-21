import { getFirestore, collection, addDoc, getDocs, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getUserFromAsyncStorage } from '../utils/AsyncStorageUtil';
import { Post } from '../classes/Post';
import UserService from '../services/UserService';

const firestore = getFirestore();

const PostService = {
  createPost: async (content, imageURL, isPublic) => {
    try {
      const user = await getUserFromAsyncStorage();
      const { uid } = user;
  
      const post = {
        content,
        userId: uid,
        createdAt: new Date().toISOString(),
        likes: [],
        comments: [],
        imageURL,
        isPublic,
        attachments: [],
        isEdited: false
      };
  
      const postRef = await addDoc(collection(firestore, 'posts'), post);
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

  likePost: async (postId, userId) => {
    try {
      const postRef = doc(firestore, 'posts', postId);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();

      // Vérifier si l'utilisateur a déjà aimé le post
      const userIndex = postData.likes.indexOf(userId);

      if (userIndex === -1) {
        // L'utilisateur n'a pas aimé le post, ajoutez son ID dans le tableau des likes
        postData.likes.push(userId);
      } else {
        // L'utilisateur a déjà aimé le post, retirez son ID du tableau des likes
        postData.likes.splice(userIndex, 1);
      }

      // Mettre à jour le champ "likes" du document avec le tableau modifié
      await updateDoc(postRef, { likes: postData.likes });
      return true; // Retourner true pour indiquer que le like a été ajouté ou supprimé
    } catch (error) {
      console.log('Erreur lors de la mise à jour du like :', error.message);
      throw error;
    }
  }
  
};

export default PostService;
