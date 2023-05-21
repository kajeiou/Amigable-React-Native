import React, { useRef, useEffect } from 'react';
import { Pressable, StyleSheet, Text, Animated, TextInput, View } from 'react-native';

export default function CustomTextInput({ placeholder, value, onChangeText, secureTextEntry, disabled, keyboardType, textAlignVertical, textArea }) {
  const inputScale = useRef(new Animated.Value(1)).current;
  const textInputRef = useRef(null);
  const isTextArea = textArea === true;

  const handleFocus = () => {
    Animated.timing(inputScale, {
      toValue: 1.1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(inputScale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (textInputRef.current && isTextArea) {
      textInputRef.current.setNativeProps({
        style: {
          height: textInputRef.current.scrollHeight,
        },
      });
    }
  }, [value, isTextArea]);

  return (
    <Animated.View style={[styles.inputContainer, { transform: [{ scale: inputScale }] }]}>
      <TextInput
        ref={textInputRef}
        style={[styles.input, disabled && styles.disabledInput, isTextArea ? styles.textArea : null]}
        placeholder={placeholder}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        keyboardType={keyboardType}
        textAlignVertical={textAlignVertical}
        multiline={isTextArea} 
        onContentSizeChange={() => null}
      />

      {disabled && <View style={styles.disabledOverlay} />}
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
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 40,
  },
  textArea: {
    height: 'auto',
    minHeight:40
  },
  disabledInput: {
    backgroundColor: '#f2f2f2',
  },
  disabledOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
  },
});
