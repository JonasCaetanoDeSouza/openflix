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

        {/* Linha com duração e texto "Assistido" */}
        <View style={styles.row}>
          {episode.runtime ? (
            <Text style={styles.runtime}>Duração: {episode.runtime} min</Text>
          ) : (
            <Text style={styles.runtime}>Duração: --</Text>
          )}
          {episode.watched && (
            <Text style={styles.watchedText}>Assistido</Text>
          )}
        </View>

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
  banner: { width: 160, height: 100, borderRadius: 8, alignSelf: 'center' },
  noImage: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#222' },
  info: { flex: 1, padding: 10, justifyContent: 'flex-start' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#e60505d0', marginBottom: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  runtime: { fontSize: 12, color: '#ccc' },
  watchedText: { fontSize: 12, color: '#e60505d0', fontWeight: 'bold' },
  overview: { fontSize: 14, color: '#ccc' },
});
