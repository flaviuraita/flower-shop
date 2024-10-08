import { Button, Text, View } from "react-native";

export default function Landing({ navigation }) {
  return (
    <View style={{ justifyContent: 'center', flex: 1 }}>
      <Button title="Navigate" onPress={() => navigation?.navigate('Menu')}/>
    </View>
  )
}
