import { Pressable, StyleSheet, Text } from "react-native";

export default function Title({  text }) {
  
  return (
    <Text style={styles.title}>{text}</Text>
  );
}

const styles = StyleSheet.create({
    title: {
      marginTop:10,
      fontSize: 24,
      color: "#900C3F",
      marginBottom: 5,
      fontWeight: 'bold',
    },
});