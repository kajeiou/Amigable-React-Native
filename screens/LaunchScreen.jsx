import React, { useRef } from 'react';
import {  SafeAreaView, StyleSheet, Text, View, Image, Animated  } from 'react-native';

import CustomButton from '../components/CustomButton';
import DividerButton from '../components/DividerButton';
import Title from '../components/Title';
import CustomContainer from '../components/CustomContainer';

export default function LaunchScreen({navigation}) {

  const button2Scale = useRef(new Animated.Value(1)).current;

  const handleButtonSignup = () => {
    navigation.navigate('SignupScreen');
  };
  const handleButtonLogin = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <CustomContainer>
      <Title text="Bienvenue" />
      <Image className="logo" source={require('../assets/logo0.png')} />

      <Text style={styles.description}>
        Connectez-vous avec vos amis et découvrez le monde qui vous entoure.
      </Text>

      <View style={styles.groupButtons}>
        
        <CustomButton text="Inscription" onPress={handleButtonSignup} />
        
        <DividerButton></DividerButton>
        <Animated.View style={{ transform: [{ scale: button2Scale }] }}>
          <CustomButton text="Connexion" onPress={handleButtonLogin} outline />
        </Animated.View>
      </View>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 30,
    color: "#808080",
    lineHeight: 24,
  },
  groupButtons: {
    flexDirection: 'row',
    justifyContent: "center",
    paddingBottom: 100,
  }
});
