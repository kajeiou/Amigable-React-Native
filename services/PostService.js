import { getFirestore, collection, addDoc, getDocs, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { doc, updateDoc, deleteDoc,query, where, orderBy } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL,uploadBytes } from 'firebase/storage';
import { getUserFromAsyncStorage } from '../utils/AsyncStorageUtil';
import { Post } from '../classes/Post';
import UserService from '../services/UserService';
import { Comment } from '../classes/Comment';

const firestore = getFirestore();
const storage = getStorage();
const PostService = {
 
  createPost: async (content, imageURIs, isPublic) => {
    try {
      const user = await getUserFromAsyncStorage();
      const { uid } = user;
  
      const post = {
        content,
        userId: uid,
        createdAt: new Date().toISOString(),
        likes: [],
        comments: [],
        imageURIs: [],
        isPublic,
        attachments: [],
        isEdited: false
      };
  
      const postRef = await addDoc(collection(firestore, 'posts'), post);
      const postId = postRef.id;
  
      const imagePromises = imageURIs.map(async (uri) => {
        const imageRef = ref(storage, `posts/${postId}/${Date.now().toString()}`);
        const response = await fetch(uri);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        const downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
      });
  
      const imageDownloadURLs = await Promise.all(imagePromises);
      post.imageURIs = imageDownloadURLs;
  
      await updateDoc(doc(firestore, 'posts', postId), { imageURIs: imageDownloadURLs });
  
      return postId;
    } catch (error) {
      console.log('Erreur lors de la création du post :', error.message);
      throw error;
    }
  },
  
  

  getPosts: async () => {
    try {
      const querySnapshot = await getDocs(
        query(
          collection(firestore, 'posts'),
          where('isPublic', '==', true),
          orderBy('createdAt', 'desc')
        )
      );
  
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
  
        const comments = doc.data().comments.map((comment) => {
          const commentUser = users.find((u) => {
            return u.uid === comment.userId;
          });
  
          return new Comment(
            comment.id,
            comment.content,
            comment.userId,
            comment.createdAt,
            comment.likes,
            commentUser
          );
        });
  
        const post = new Post(
          doc.id,
          doc.data().content,
          doc.data().userId,
          doc.data().createdAt,
          doc.data().likes,
          comments,
          doc.data().imageURIs,
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

  likePost: async (postId) => {
    try {
      const userA = await getUserFromAsyncStorage();
      const { uid } = userA;
      const postRef = doc(firestore, 'posts', postId);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();
      const userIndex = postData.likes.indexOf(uid);

      if (userIndex === -1) {
        // L'utilisateur n'a pas aimé le post, ajoutez son ID dans le tableau des likes
        postData.likes.push(uid);
      } else {
        // L'utilisateur a déjà aimé le post, retirez son ID du tableau des likes
        postData.likes.splice(userIndex, 1);
      }

      await updateDoc(postRef, { likes: postData.likes });
      return true;
    } catch (error) {
      console.log('Erreur lors de la mise à jour du like :', error.message);
      throw error;
    }
  },

  addCommentToPost: async (postId, commentText) => {
    try {
      const userA = await getUserFromAsyncStorage();
      const { uid } = userA;
      const postRef = doc(firestore, 'posts', postId);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();
  
      const newComment = {
        userId: uid, 
        content: commentText, 
        createdAt: new Date().toISOString(),
        likes: [],
      };      
  
      postData.comments.push(newComment);
  
      await updateDoc(postRef, { comments: postData.comments });
  
      // Récupère les données mises à jour du post
      const updatedPostSnapshot = await getDoc(postRef);
      const updatedPostData = updatedPostSnapshot.data();
  
      // Ajoute l'utilisateur au post
      const user = await UserService.getUserById(updatedPostData.userId);
  
      // Retourne les données mises à jour du post avec l'utilisateur
      return {
        ...updatedPostData,
        id: updatedPostSnapshot.id,
        user: user
      };
    } catch (error) {
      console.log('Erreur lors de l\'ajout du commentaire :', error.message);
      throw error;
    }
  },
  getPostsByUser : async () => {
    try {
      const user = await getUserFromAsyncStorage();
      const { uid } = user;
      const querySnapshot = await getDocs(
        query(
          collection(firestore, 'posts'),
          where('userId', '==', uid),
          orderBy('createdAt', 'desc')
        )
      );
  
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
  
        const comments = doc.data().comments.map((comment) => {
          const commentUser = users.find((u) => {
            return u.uid === comment.userId;
          });
  
          return new Comment(
            comment.id,
            comment.content,
            comment.userId,
            comment.createdAt,
            comment.likes,
            commentUser
          );
        });
  
        const post = new Post(
          doc.id,
          doc.data().content,
          doc.data().userId,
          doc.data().createdAt,
          doc.data().likes,
          comments,
          doc.data().imageURIs,
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
  }
  
  
  
};

export default PostService;
