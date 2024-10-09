import React from 'react';
import { View, Text, Button } from 'react-native';

const EditRecipeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Edit Recipe Screen</Text>
      <Button title="Save Changes" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default EditRecipeScreen;
