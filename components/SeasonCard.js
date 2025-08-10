import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function SeasonCard({ season, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {season.posterUrl ? (
        <Image source={{ uri: season.posterUrl }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, styles.noImage]}>
          <Text style={{ color: '#999' }}>Sem imagem</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{season.displayName}</Text>

        <Text style={styles.overview} >
          {season.overview || 'Sem descrição disponível.'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#121212',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  poster: {
    width: 100,
    height: 150,
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e60505d0',
    marginBottom: 6,
  },
  overview: {
    fontSize: 14,
    color: '#ccc',
  },
});
