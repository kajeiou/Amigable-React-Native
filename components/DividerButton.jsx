import { StyleSheet, Text, View } from "react-native";

export default function DividerButton() {
    return (
      
      <View>
        <Text style={styles.divider}></Text>
      </View>
    );
}

const styles = StyleSheet.create({
    divider: {
      paddingLeft:10,
      paddingRight:10
    }
});