import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  Image, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from './firebases';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const AddRecipeScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Function to pick an image from the device
  const pickImage = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (result.granted === false) {
      alert("Permission to access media is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };

  // Function to upload the image to Firebase Storage
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageName = `recipes/${new Date().getTime()}_${Math.random().toString(36).substring(7)}`;
    const imageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(imageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: track upload progress here
        },
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  // Function to handle recipe submission
  const handleSaveRecipe = async () => {
    if (!title || !ingredients || !instructions) {
      Alert.alert("Please fill all fields");
      return;
    }

    setUploading(true);

    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
      }

      // Save recipe data to Firestore
      await addDoc(collection(db, 'recipes'), {
        title,
        ingredients: ingredients.split(','), // Assuming ingredients are entered as comma-separated
        instructions,
        imageUrl,
      });

      Alert.alert('Success', 'Recipe saved successfully');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong, please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Add a New Recipe</Text>

      <TextInput
        style={styles.input}
        placeholder="Recipe Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="Ingredients (comma-separated)"
        value={ingredients}
        onChangeText={setIngredients}
        placeholderTextColor="#aaa"
        multiline
      />

      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="Instructions"
        value={instructions}
        onChangeText={setInstructions}
        placeholderTextColor="#aaa"
        multiline
      />

      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Pick an Image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveRecipe}
        disabled={uploading}
      >
        {uploading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save Recipe</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddRecipeScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePickerButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#2980b9',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: '#dcdde1',
    borderWidth: 1,
  },
  saveButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#27ae60',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
