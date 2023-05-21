import React, { useRef, useEffect } from 'react';
import { Pressable, StyleSheet, Text, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Import de la bibliothèque d'icônes

export default function CustomButton({ onPress, outline, text, disabled, icon }) {
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
        {icon && (
          <Icon name={icon} size={24} color={outline ? '#900C3F' : '#ffffff'} style={styles.icon} />
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#900C3F',
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row-reverse', // Placer l'icône à droite du texte
    alignItems: 'center', // Centrer l'icône verticalement
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#900C3F',
    borderWidth: 2,
    paddingVertical: 13,
  },
  textPrimary: {
    color: '#900C3F',
    fontSize: 14,
    fontWeight: '500',
  },
  textWhite: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  disabledText: {
    color: '#ffffff',
  },
  icon: {
    marginRight: 12, // Utiliser marginLeft au lieu de marginRight
  },
});
