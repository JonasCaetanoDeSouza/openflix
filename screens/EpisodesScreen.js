// screens/EpisodesScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import { fetchEpisodes } from '../services/api';
import { useRoute, useNavigation } from '@react-navigation/native';
import EpisodeCard from '../components/EpisodeCard';

export default function EpisodesScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { season, showId } = route.params;

  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEpisodes() {
      try {
        // season.id e season.seasonNumber são necessários para buscar os episódios
        const data = await fetchEpisodes(showId, season.seasonNumber);
        setEpisodes(data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os episódios.');
      } finally {
        setLoading(false);
      }
    }
    loadEpisodes();
  }, [season]);

  const renderEpisode = ({ item }) => (
    <EpisodeCard
      episode={item}
      onPress={() => alert("Player para series não implementado")}
    />
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e60505d0" />
      </View>
    );
  }

  if (episodes.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#fff' }}>Nenhum episódio encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEpisode}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
