import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function EpisodeCard({ episode, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {episode.still_url ? (
        <Image source={{ uri: episode.still_url }} style={styles.banner} />
      ) : (
        <View style={[styles.banner, styles.noImage]}>
          <Text style={{ color: '#999' }}>Sem imagem</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title}>{episode.name}</Text>
        
        {episode.runtime ? (
          <Text style={styles.runtime}>Duração: {episode.runtime} min</Text>
        ) : null}

        <Text style={styles.overview}>
          {episode.overview || 'Sem descrição disponível.'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#121212',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  banner: {
    width: 160,
    height: 100,
    borderRadius: 8,
    alignSelf: 'center', // centraliza verticalmente a imagem
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e60505d0',
    marginBottom: 4,
  },
  runtime: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 6,
  },
  overview: {
    fontSize: 14,
    color: '#ccc',
  },
});
