import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CustomContainer from '../../components/CustomContainer';
import Title from '../../components/Title';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import * as ImagePicker from 'expo-image-picker'; // Import d'ImagePicker
import PostService from "../../services/PostService";
import CustomCarousel from '../../components/CustomCarousel';
import MenuScreen from './Menu/MenuScreen';

export default function AddPostScreen() {
  const [content, setContent] = useState('');
  const [imageURIs, setImageURIs] = useState([]);
  const [isPublic, setIsPublic] = useState(true);

  const handleCreatePost = async () => {   
    try {
      const postId = await PostService.createPost(content, imageURIs, isPublic);
      console.log('Post créé avec succès ! ID :', postId);
      alert("Post créé avec succès !");
      setContent("");
      setImageURIs([]);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleAttachImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission d'accès à la bibliothèque d'images refusée");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync();

      if (pickerResult.canceled === true) {
        return;
      }
      const { assets } = pickerResult;
      const uris = assets.map(asset => asset.uri);
      setImageURIs(prevURIs => [...prevURIs, ...uris]);

    } catch (error) {
      console.log('Erreur lors de l\'attachement de l\'image :', error.message);
      alert('Erreur lors de l\'attachement de l\'image');
    }
  };

  const isButtonDisabled = content.trim() === '' && imageURIs === '';

  return (

    <>
      <CustomContainer>
        <Title text="Nouvelle publication" />
        <CustomCarousel imageURIs={imageURIs} />
        <View style={styles.formContainer}>
          <CustomTextInput
            placeholder="Exprimez-vous..."
            value={content}
            onChangeText={setContent}
            multiline={true}
            textAlignVertical="top"
            textArea={true}
          />
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
      <MenuScreen/>
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  attachedImage: {
    width: '100%',
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
