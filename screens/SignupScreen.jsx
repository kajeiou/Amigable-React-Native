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
  const [repeatPassword, setRepeatPassword] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [email, password, repeatPassword]);

  const validateForm = () => {
    setIsFormValid(email !== '' && password !== '' && password === repeatPassword);
  };

  const handleSignup = async () => {
    if (isFormValid) {
      try {
        await AuthService.register(email, password);
        alert("Tu t'es inscrit avec succès ");
      } catch (e) {
        alert(e.message);
      }
    } else {
      alert("Renseigne tous les champs en vérifiant que les mots de passes correspondent.");
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
      case 'repeatPassword':
        setRepeatPassword(textEntered);
        break;
      default:
        return false;
    }
  };

  return (
    <CustomContainer>
        <Title text="Inscrit-toi !" />

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
        <CustomTextInput
          placeholder="Mot de passe - Confirmation"
          value={repeatPassword}
          onChangeText={(textEntered) => onChangeHandler(textEntered, 'repeatPassword')}
          secureTextEntry={true}
        />      

        <DividerRow />

        <CustomButton
          text="M'inscrire maintenant"
          onPress={handleSignup}
          disabled={!isFormValid}
        />

      </CustomContainer>
  );
}

const styles = StyleSheet.create({
  
});
