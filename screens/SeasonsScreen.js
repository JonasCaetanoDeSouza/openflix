import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import { fetchTvSeasons } from '../services/api';
import { useRoute, useNavigation } from '@react-navigation/native';
import SeasonCard from '../components/SeasonCard';

export default function SeasonsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params; // série

  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSeasons() {
      try {
        const data = await fetchTvSeasons(item.id);
        // Ordena as temporadas, colocando "Especiais" por último
        const sortedSeasons = data.sort((a, b) => {
          if (a.name === 'Especiais') return 1; // 'Especiais' vai para o fim
          if (b.name === 'Especiais') return -1;
          return a.seasonNumber - b.seasonNumber; // ordem crescente normal
        });
        setSeasons(sortedSeasons);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as temporadas.');
      } finally {
        setLoading(false);
      }
    }
    loadSeasons();
  }, [item.id]);

  const renderSeason = ({ item: season }) => (
    <SeasonCard
      season={season}
      onPress={() => navigation.navigate('Episodes', { season, showId: item.id })}
    />
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e60505d0" />
      </View>
    );
  }

  if (seasons.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#fff' }}>Nenhuma temporada encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={seasons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSeason}
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
