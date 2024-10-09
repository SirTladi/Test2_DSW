import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text style={styles.info}>User information can be displayed here.</Text>
      
      {/* Button to navigate to the Settings screen */}
      <Button title="Edit Profile" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
};

// StyleSheet for consistent styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light gray background for better visibility
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ProfileScreen;
