import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';

import Title from '../components/Title';

import AuthService from "../services/AuthService";
import CustomButton from '../components/CustomButton';
import DividerRow from '../components/DividerRow';
import CustomTextInput from '../components/CustomTextInput';
import CustomContainer from '../components/CustomContainer';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    setIsFormValid(email !== '' && password !== '');
  };

  const handleSignup = async () => {
    if (isFormValid) {
      try {
        await AuthService.signIn(email, password);
        alert("Tu t'es connecté avec succès ");
      } catch (e) {
        alert(e.message);
      }
    } else {
      alert("Renseigne tous les champs.");
    }
  };

  const onChangeHandler = (textEntered, keyInput) => {
    switch(keyInput) {
      case 'email':
        setEmail(textEntered);
        break;
      case 'password':
        setPassword(textEntered);
        break;
      default:
        return false;
    }
  };

  return (
    <CustomContainer>
        <Title text="Connecte-toi !" />

        <CustomTextInput
          placeholder="Adresse e-mail"
          value={email}
          onChangeText={(textEntered) => onChangeHandler(textEntered, 'email')}
        />   
        <CustomTextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={(textEntered) => onChangeHandler(textEntered, 'password')}
          secureTextEntry={true}
        />    

        <DividerRow />

        <CustomButton
          text="Me connecter maintenant"
          onPress={handleSignup}
          disabled={!isFormValid}
        />

      </CustomContainer>
  );
}

const styles = StyleSheet.create({

});
