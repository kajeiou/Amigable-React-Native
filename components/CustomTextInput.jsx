import React, { useRef, useEffect } from 'react';
import { Pressable, StyleSheet, Text, Animated, TextInput } from 'react-native';

export default function CustomTextInput({ placeholder, value, onChangeText,secureTextEntry }) {

    const inputScale = React.useRef(new Animated.Value(1)).current;

    const handleFocus = () => {
        Animated.timing(inputScale, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }).start();
    };
    
    const handleBlur = () => {
        Animated.timing(inputScale, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }).start();
    };
  return (
    <Animated.View style={[styles.inputContainer, { transform: [{ scale: inputScale }] }]}>
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '80%',
        marginVertical: 10,
      },
      input: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        color: '#000',
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
      },
});
