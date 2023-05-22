import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomContainer from "../../../components/CustomContainer";
import Title from '../../../components/Title';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomTextInput from '../../../components/CustomTextInput';
import AuthService from '../../../services/UserService';
import emptyPhoto from '../../../assets/images/empty_photo.png';
import CustomButton from '../../../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import { getUserFromAsyncStorage } from '../../../utils/AsyncStorageUtil';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfilScreen() {
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [biography, setBiography] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    photoURL: '',
    phoneNumber: '',
    biography: '',
    emailVerified: false,
  });
  const [isFormModified, setIsFormModified] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = await getUserFromAsyncStorage();

        setFormData((prevData) => ({
          ...prevData,
          displayName: storedUser.displayName,
          email: storedUser.email,
          photoURL: storedUser.photoURL,
          phoneNumber: storedUser.phoneNumber,
          biography: storedUser.biography,
          emailVerified: storedUser.emailVerified,
        }));

        setDisplayName(storedUser.displayName);
        setEmail(storedUser.email);
        setPhotoURL(storedUser.photoURL);
        setPhoneNumber(storedUser.phoneNumber);
        setBiography(storedUser.biography);
        setEmailVerified(storedUser.emailVerified);
      } catch (error) {
        console.log('[Profil Screen] Erreur lors du chargement des données:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isFormModified) {
      onChangeHandler();
    }
  }, [isFormModified]);

  const onChangeHandler = async () => {
    try {
      await AuthService.updateUser(
        formData.displayName,
        formData.photoURL,
        formData.phoneNumber,
        formData.biography
      );

      setDisplayName(formData.displayName);
      setEmail(formData.email);
      setPhotoURL(photoURL);
      setPhoneNumber(formData.phoneNumber);
      setBiography(formData.biography);
      setEmailVerified(formData.emailVerified);
      setIsFormModified(false);
    } catch (error) {
      console.log("[Profil Screen]" + error.message);
    }
  };

  const handleChange = (key, value) => {
    const updatedFormData = {
      ...formData,
      [key]: value,
    };

    setFormData(updatedFormData);
    setIsFormModified(true);
  };

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.log("Profil Screen" + error.message);
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
      setPhotoURL(uris[0])
      setIsFormModified(true);

      await AuthService.updateUser(
        formData.displayName,
        uris[0], 
        formData.phoneNumber,
        formData.biography
      );

      setFormData((prevData) => ({
        ...prevData,
        photoURL: uris[0],
      }));

      setIsFormModified(false);

    } catch (error) {
      console.log('[Profil Screen] Erreur lors de l\'attachement de l\'image :', error.message);
      alert('Erreur lors de l\'attachement de l\'image');
    }
  };

  return (
    <CustomContainer>
      <View style={styles.container}>
        <Title text={displayName} />
        <View style={styles.profileContainer}>
          <View style={styles.photoContainer}>
          <Image
            source={
              photoURL && photoURL !==''
                ? { uri: photoURL }
                : emptyPhoto
            }
            style={styles.userPhoto}
          />
          {emailVerified ? (
            <View style={styles.verifiedContainer}>
              <Octicons name="webhook" size={24} color="#2CC90D" />
              <Text style={styles.verifiedText}>verified</Text>
            </View>
          ) : (
            <View style={styles.verifiedContainer}>
              <Octicons name="webhook" size={24} color="#C90D37" />
              <Text style={styles.unverifiedText}>non vérifié</Text>
            </View>
          )}

          </View>
          <View style={styles.infoContainer}>
            <CustomTextInput
              placeholder="Nom d'affichage"
              value={formData.displayName}
              onChangeText={(textEntered) => handleChange('displayName', textEntered)}
            />

            <CustomTextInput
              placeholder="E-mail"
              value={formData.email}
              disabled
            />
            <TouchableOpacity onPress={handleAttachImage}>
              <MaterialIcons name="camera-alt" size={30} color="#000" style={styles.buttonIcon} />
            </TouchableOpacity>

            <CustomTextInput
              placeholder="Numéro de téléphone"
              value={formData.phoneNumber}
              onChangeText={(textEntered) => handleChange('phoneNumber', textEntered)}
              keyboardType="phone-pad"
            />

            <CustomTextInput
              placeholder="Biographie"
              value={formData.biography}
              onChangeText={(textEntered) => handleChange('biography', textEntered)}
            />
          </View>
        </View>
        <CustomButton text="Déconnexion" onPress={handleLogout} />
      </View>
    </CustomContainer>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 150
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  photoContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    padding:10,

  },
  userPhoto: {
    width: "100%",
    height: "100%",
    marginRight: 8,
    borderRadius: 50,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 20,
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#900C3F',
  },

  verifiedContainer: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 12,
    color: '#900C3F',
  },
  unverifiedText: {
    fontSize: 12,
    color: '#900C3F',
  },
});
