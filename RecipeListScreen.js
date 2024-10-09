import React from 'react';
import {View,Text,FlatList, TouchableOpacity, StyleSheet, StatusBar,Image } from 'react-native';

const RecipeListScreen = ({ navigation }) => {
  const recipes = [
    {
      id: '1',
      title: 'Spaghetti Bolognese',
      ingredients: [
        '200g spaghetti',
        '150g ground beef',
        '1 onion, chopped',
        '2 cloves garlic, minced',
        '1 can of crushed tomatoes',
        '1 tbsp olive oil',
        'Salt and pepper to taste',
      ],
      instructions: `
      1. Cook the spaghetti according to the package instructions. Drain and set aside.
      2. In a pan, heat the olive oil and sauté the onion and garlic until golden.
      3. Add the ground beef and cook until browned.
      4. Pour in the crushed tomatoes and simmer for 15 minutes.
      5. Season with salt and pepper. Serve the sauce over the spaghetti.
      `,
      image: require('./images/Spagethi_Bolonise.jpeg'),
    },
    {
      id: '2',
      title: 'Chicken Caesar Salad',
      ingredients: [
        '2 chicken breasts',
        '1 head of romaine lettuce, chopped',
        '50g croutons',
        '50g parmesan cheese, shaved',
        '3 tbsp Caesar dressing',
        'Olive oil for cooking',
      ],
      instructions: `
      1. Grill or pan-fry the chicken breasts in olive oil until cooked through. Slice thinly.
      2. In a bowl, toss the lettuce with croutons, parmesan, and Caesar dressing.
      3. Top the salad with sliced chicken and serve.
      `,
      image: require('./images/Chicken_Salad.jpeg'),
    },
    {
      id: '3',
      title: 'Veggie Stir-Fry',
      ingredients: [
        '1 red bell pepper, sliced',
        '1 carrot, julienned',
        '100g broccoli florets',
        '1 zucchini, sliced',
        '2 tbsp soy sauce',
        '1 tbsp sesame oil',
        '1 tsp ginger, grated',
      ],
      instructions: `
      1. Heat sesame oil in a wok or pan over medium-high heat.
      2. Add ginger and stir-fry for 1 minute.
      3. Add all vegetables and stir-fry for 5-7 minutes until they are crisp-tender.
      4. Pour in soy sauce and cook for another 2 minutes.
      5. Serve hot, optionally over rice or noodles.
      `,
      image: require('./images/veggie_stir_fry.jpeg'),
    },
    {
      id: '4',
      title: 'Margherita Pizza',
      ingredients: [
        '1 pizza base',
        '100g tomato sauce',
        '100g mozzarella cheese, sliced',
        'Fresh basil leaves',
        '1 tbsp olive oil',
      ],
      instructions: `
      1. Preheat the oven to 220°C (425°F).
      2. Spread the tomato sauce over the pizza base.
      3. Add mozzarella slices and fresh basil leaves on top.
      4. Drizzle with olive oil and bake for 10-12 minutes until the crust is golden.
      5. Remove from oven and serve.
      `,
      image: require('./images/Margaritha_Pizza.jpeg'),
    },
    {
      id: '5',
      title: 'Banana Pancakes',
      ingredients: [
        '1 ripe banana, mashed',
        '1 egg',
        '50g flour',
        '1/2 cup milk',
        '1 tsp baking powder',
        'Maple syrup and berries for serving',
      ],
      instructions: `
      1. In a bowl, mix the mashed banana, egg, flour, milk, and baking powder until smooth.
      2. Heat a non-stick pan and pour a small amount of batter to form a pancake.
      3. Cook for 2-3 minutes on each side until golden brown.
      4. Serve with maple syrup and fresh berries.
      `,
      image: require('./images/banana_Pizza.jpeg'),
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image source={item.image} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <Text style={styles.viewDetails}>View Details</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <Text style={styles.title}>Recipe List</Text>
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AddRecipe')}
      >
        <Text style={styles.addButtonText}>+ Add New Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 100,
  },
  recipeItem: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    justifyContent: 'space-between',
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  viewDetails: {
    marginTop: 8,
    fontSize: 14,
    color: '#007BFF',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#007BFF',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default RecipeListScreen;
