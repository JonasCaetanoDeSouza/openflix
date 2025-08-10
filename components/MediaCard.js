import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MediaCard({ item }) {
  const navigation = useNavigation();

  const renderStars = (vote) => {
    const stars = [];
    const fullStars = Math.floor(vote / 2);
    const halfStar = vote % 2 >= 1;
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesome key={'full' + i} name="star" size={16} color="#FFD600" />
      );
    }
    if (halfStar) {
      stars.push(
        <FontAwesome key={'half'} name="star-half-full" size={16} color="#FFD600" />
      );
    }
    while (stars.length < 5) {
      stars.push(
        <FontAwesome key={'empty' + stars.length} name="star-o" size={16} color="#FFD600" />
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => {
        if (item.media_type === 'tv') {
          navigation.navigate('Seasons', { item }); // nova tela para temporadas
        } else {
          navigation.navigate('Watch', { item }); // player filme
        }
      }}
    >
      {item.poster_url ? (
        <Image source={{ uri: item.poster_url }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, styles.noImage]}>
          <FontAwesome name="picture-o" size={50} color="#666" />
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{item.displayTitle}</Text>
        <Text style={styles.overview} numberOfLines={3}>
          {item.overview}
        </Text>
        <View style={styles.starsRow}>{renderStars(item.vote_average)}</View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#121212',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  poster: {
    width: 100,
    height: 150,
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#777179',
    marginBottom: 4,
  },
  overview: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 8,
  },
  starsRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
});
