import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import RecipeListScreen from './RecipeListScreen';
import AddRecipeScreen from './AddRecipeScreen';
import EditRecipeScreen from './EditRecipeScreen';
import RecipeDetailScreen from './RecipeDetailScreen';
import ProfileScreen from './ProfileScreen';
import { auth } from './firebases';
import { onAuthStateChanged } from 'firebase/auth';
import { View, Text, ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "RecipeListScreen" : "Login"}>
        {/* Authentication Screens */}
        {!user ? (
          <>
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
            <Stack.Screen name="AddRecipe" component={AddRecipeScreen} options={{ title: 'Add Recipe' }} />
            <Stack.Screen name="EditRecipe" component={EditRecipeScreen} options={{ title: 'Edit Recipe' }} />
            <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: 'Recipe Detail' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
            <Stack.Screen name="RecipeListScreen" component={RecipeListScreen} options={{ title: 'Recipes' }} />
          </>
        ) : (
          <>
            {/* Main Application Screens */}
            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
