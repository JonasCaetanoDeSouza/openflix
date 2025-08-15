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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EpisodesScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { season, showId } = route.params;

  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEpisodes() {
      try {
        const data = await fetchEpisodes(showId, season.seasonNumber);

        // Carrega episódios assistidos do AsyncStorage
        const watchedData = await AsyncStorage.getItem(`watched_${showId}`);
        const watchedList = watchedData ? JSON.parse(watchedData) : [];

        const episodesWithWatched = data.map((ep) => ({
          ...ep,
          watched: watchedList.includes(ep.id),
        }));

        setEpisodes(episodesWithWatched);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os episódios.');
      } finally {
        setLoading(false);
      }
    }
    loadEpisodes();
  }, [season, showId]);

  // Marca episódio como assistido
  const markAsWatched = async (episodeId) => {
    setEpisodes((prev) =>
      prev.map((ep) =>
        ep.id === episodeId ? { ...ep, watched: true } : ep
      )
    );

    const watchedData = await AsyncStorage.getItem(`watched_${showId}`);
    const watchedList = watchedData ? JSON.parse(watchedData) : [];

    if (!watchedList.includes(episodeId)) {
      watchedList.push(episodeId);
      await AsyncStorage.setItem(`watched_${showId}`, JSON.stringify(watchedList));
    }
  };

  const renderEpisode = ({ item }) => (
    <EpisodeCard
      episode={item}
      onPress={() =>
        navigation.navigate('Watch', {
          item: {
            media_type: 'tv',
            show_id: item.show_id,
            season_number: item.season_number,
            episode_number: item.episode_number,
            id: item.id,
            name: item.name,
            overview: item.overview,
            still_url: item.still_url,
            backdrop_url: item.still_url,
            runtime: item.runtime,
          },
          onWatched: markAsWatched, // <- envia callback para marcar assistido ao abrir
        })
      }
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
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
});
