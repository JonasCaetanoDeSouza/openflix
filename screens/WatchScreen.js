// screens/WatchScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Video from 'react-native-video';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as NavigationBar from 'expo-navigation-bar';
import { useRoute } from '@react-navigation/native';
import { fetchMovieStreaming, fetchEpisodeStreaming } from '../services/api';

export default function WatchScreen() {
  const route = useRoute();
  const { item } = route.params;

  const videoRef = useRef(null);
  const [streamingUrl, setStreamingUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);

const isEpisode = item.media_type === 'tv';

  useEffect(() => {
    if (playerOpen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      NavigationBar.setVisibilityAsync('hidden');
      StatusBar.setHidden(true);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      NavigationBar.setVisibilityAsync('visible');
      StatusBar.setHidden(false);
    }
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      NavigationBar.setVisibilityAsync('visible');
      StatusBar.setHidden(false);
    };
  }, [playerOpen]);

  async function openNativePlayer() {
    setLoading(true);
    try {
      let response;
      if (isEpisode) {
        response = await fetchEpisodeStreaming(
          item.id,
          item.season_number,
          item.episode_number
        );
      } else {
        response = await fetchMovieStreaming(item.id);
      }
      setStreamingUrl(response.video);
      setPlayerOpen(true);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o vídeo.');
    } finally {
      setLoading(false);
    }
  }

  async function openVLC() {
    setLoading(true);
    try {
      let response;
      if (isEpisode) {
        response = await fetchEpisodeStreaming(
          item.show_id,
          item.season_number,
          item.episode_number
        );
      } else {
        response = await fetchMovieStreaming(item.id);
      }
      const vlcUrl = `vlc://${response.video}`;
      const supported = await Linking.canOpenURL(vlcUrl);
      if (supported) {
        Linking.openURL(vlcUrl);
      } else {
        Alert.alert('VLC não encontrado', 'Por favor, instale o VLC para usar essa opção.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível abrir o VLC.');
    } finally {
      setLoading(false);
    }
  }

  if (playerOpen && streamingUrl) {
    return (
      <View style={styles.playerContainer}>
        <Video
          ref={videoRef}
          source={{ uri: streamingUrl }}
          style={styles.video}
          resizeMode="contain"
          controls
          onEnd={() => {
            setPlayerOpen(false);
            setStreamingUrl(null);
          }}
          onError={() => {
            Alert.alert('Erro', 'Ocorreu um erro ao reproduzir o vídeo.');
            setPlayerOpen(false);
            setStreamingUrl(null);
          }}
          fullscreen={true}
          paused={false}
        />
      </View>
    );
  }

  const backgroundImage = isEpisode ? item.still_url : item.backdrop_url;
  const title = isEpisode ? item.name : item.title || item.name;
  const description = item.overview?.trim() || 'Sem descrição disponível.';

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.content}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.playButton} onPress={openNativePlayer} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Ionicons name="play-circle" size={80} color="#fff" />
            )}
            <Text style={styles.buttonText}>Player Nativo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.playButton} onPress={openVLC} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Ionicons name="play-circle" size={80} color="#fff" />
            )}
            <Text style={styles.buttonText}>VLC</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.overview}>{description}</Text> : null}
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
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  playButton: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    marginTop: 6,
    fontWeight: 'bold',
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
  playerContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
});
