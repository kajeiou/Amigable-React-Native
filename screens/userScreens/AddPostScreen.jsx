import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import des icônes MaterialIcons
import CustomContainer from '../../components/CustomContainer';
import Title from '../../components/Title';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import PostService from "../../services/PostService";


export default function AddPostScreen() {
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleCreatePost = async () => {   
    try {
      const postId = await PostService.createPost(content,imageURL,isPublic);
      console.log('Post créé avec succès ! ID :', postId);
      alert("Post créé avec succès !")
      setContent("")
      setImageURL("")
    } catch (e) {
        alert(e.message);
    }
  };

  const handleAttachImage = () => {
    // Logique pour attacher une image au post
    console.log('Attacher une image');
  };

  const isButtonDisabled = content.trim() === '' && imageURL === '';

  return (
    <CustomContainer>
      <Title text="Nouvelle publication" />
      <View style={styles.formContainer}>
        <CustomTextInput
          placeholder="Exprimez-vous..."
          value={content}
          onChangeText={setContent}
          multiline={true}
          textAlignVertical="top"
          textArea ={true}
        />
        {imageURL !== '' && (
          <TouchableOpacity onPress={handleAttachImage}>
            <Image source={{ uri: imageURL }} style={styles.attachedImage} />
          </TouchableOpacity>
        )}
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={handleAttachImage}>
            <MaterialIcons name="camera-alt" size={30} color="#000" style={styles.buttonIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsPublic(!isPublic)}>
            {isPublic ? (
              <>
                <MaterialIcons name="public" size={30} color="#000" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Public</Text>
              </>
            ) : (
              <>
                <MaterialIcons name="public-off" size={30} color="#000" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Privé</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <CustomButton text="Publier" onPress={handleCreatePost} disabled={isButtonDisabled} icon={"send"} />
      </View>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  attachedImage: {
    width: '80%',
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  buttonIcon: {
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
