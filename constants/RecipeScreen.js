import React from 'react';
import { View, Text, Button } from 'react-native';

const RecipeListScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Recipe List Screen</Text>
      <Button title="Add Recipe" onPress={() => navigation.navigate('AddRecipe')} />
    </View>
  );
};

export default RecipeListScreen;
