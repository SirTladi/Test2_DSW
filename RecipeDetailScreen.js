import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const RecipeDetailScreen = ({ route, navigation }) => {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Image source={recipe.image} style={styles.recipeImage} />
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.ingredientsTitle}>Ingredients:</Text>
      <Text style={styles.ingredients}>{recipe.ingredients.join('\n')}</Text>
      <Text style={styles.instructionsTitle}>Instructions:</Text>
      <Text style={styles.instructions}>{recipe.instructions.trim()}</Text>
      <Button title="Back to Recipes" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredientsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  ingredients: {
    fontSize: 16,
    marginBottom: 10,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default RecipeDetailScreen;
