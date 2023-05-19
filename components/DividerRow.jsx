import { StyleSheet, Text, View } from "react-native";

export default function DividerRow() {
    return (
      
      <View style={styles.divider}>
        <Text></Text>
      </View>
    );
}

const styles = StyleSheet.create({
    divider: {
      paddingtop:10,
      paddingRight:10
    }
});