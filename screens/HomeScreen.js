import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { fetchTrending, searchMedia } from '../services/api';
import MediaCard from '../components/MediaCard';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    loadTrending();
  }, []);

  async function loadTrending() {
    setLoading(true);
    setError(null);
    const data = await fetchTrending();
    if (data.length === 0) {
      setError('Não foi possível carregar os conteúdos em alta');
    }
    setMedia(data);
    setLoading(false);
  }

  async function handleSearch(text) {
    setSearching(true);
    setError(null);
    const results = await searchMedia(text);
    if (results.length === 0) {
      setError('Nenhum resultado encontrado');
    }
    setMedia(results);
    setSearching(false);
  }

  const sections = [
    {
      title: 'Filmes',
      data: media.filter((item) => item.media_type === 'movie'),
    },
    {
      title: 'Séries',
      data: media.filter((item) => item.media_type === 'tv'),
    },
    {
      title: 'Outros',
      data: media.filter(
        (item) => item.media_type !== 'movie' && item.media_type !== 'tv'
      ),
    },
  ].filter((section) => section.data.length > 0);

  const renderItem = ({ item }) => <MediaCard item={item} />;

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={() => handleSearch(query)}
      />

      {loading || searching ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#e60505d0" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.list}
          stickySectionHeadersEnabled={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#666666', // cinza escuro
    marginVertical: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
});
