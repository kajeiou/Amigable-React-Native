import React, { useRef, useEffect } from 'react';
import { Pressable, StyleSheet, Text, Animated } from 'react-native';

export default function CustomButton({ onPress, outline, text, disabled }) {
  const buttonStyle = outline ? [styles.button, styles.outline] : styles.button;
  const textStyle = outline ? styles.textPrimary : styles.textWhite;

  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (disabled) {
      buttonScale.setValue(1);
    }
  }, [disabled]);

  const handlePress = () => {
    if (onPress) {
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => onPress());
    }
  };

  return (
    <Animated.View style={[{ transform: [{ scale: buttonScale }] }]}>
      <Pressable onPress={handlePress} style={[buttonStyle, disabled ? styles.disabledButton : null]} disabled={disabled}>
        <Text style={[textStyle, disabled ? styles.disabledText : null]}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e51b23',
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 8
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#e51b23',
    borderWidth: 2,
    paddingVertical: 13
  },
  textPrimary: {
    color: '#e51b23',
    fontSize: 14,
    fontWeight: '500'
  },
  textWhite: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500'
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  disabledText: {
    color: '#ffffff',
  }
});
