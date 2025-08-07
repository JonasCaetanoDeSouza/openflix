// screens/WatchScreen.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ou outro ícone de sua escolha
import { useRoute } from '@react-navigation/native';

export default function WatchScreen() {
  const route = useRoute();
  const { item } = route.params;

  return (
    <ImageBackground
      source={{ uri: item.backdrop_url }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.content}>
        <TouchableOpacity style={styles.playButton} onPress={() => console.log('Play pressed')}>
          <Ionicons name="play-circle" size={80} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>{item.title || item.name}</Text>
        {item.overview ? <Text style={styles.overview}>{item.overview}</Text> : null}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  playButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
});
