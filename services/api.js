import { Episode, Season, Media, StreamingResponse } from './types';

const BASE_URL = 'https://vps61553.publiccloud.com.br/api/v1';

export async function fetchTrending() {
  try {
    const response = await fetch(`${BASE_URL}/trending`);
    if (!response.ok) throw new Error('Erro ao buscar conteúdo em alta');
    const data = await response.json();
    return data.map(item => new Media(item));
  } catch (error) {
    console.error('API fetchTrending error:', error.message);
    return [];
  }
}

export async function searchMedia(query) {
  try {
    const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Erro ao buscar resultados da pesquisa');
    const data = await response.json();
    return data.map(item => new Media(item));
  } catch (error) {
    console.error('API searchMedia error:', error.message);
    return [];
  }
}

export async function fetchMovieStreaming(id) {
  try {
    const response = await fetch(`${BASE_URL}/streaming/movie?id=${encodeURIComponent(id)}`);
    if (!response.ok) throw new Error('Erro ao buscar link de streaming do filme');
    const data = await response.json();
    return new StreamingResponse(data);
  } catch (error) {
    console.error('API fetchMovieStreaming error:', error.message);
    return null;
  }
}

export async function fetchEpisodeStreaming(showId, seasonNumber, episodeNumber) {
  try {
    const response = await fetch(
      `${BASE_URL}/streaming/tv?id=${encodeURIComponent(showId)}&temporada=${encodeURIComponent(seasonNumber)}&episodio=${encodeURIComponent(episodeNumber)}`
    );
        
    if (!response.ok) throw new Error(`Erro ao buscar link de streaming do episódio ${seasonNumber}x${episodeNumber}`);
    const data = await response.json();
    return new StreamingResponse(data);
  } catch (error) {
    console.error('API fetchEpisodeStreaming error:', error.message);
    return null;
  }
}

export async function fetchTvSeasons(tvId) {
  try {
    const response = await fetch(`${BASE_URL}/tv/seasons/${encodeURIComponent(tvId)}`);
    if (!response.ok) throw new Error('Erro ao buscar temporadas da série');
    const data = await response.json();
    return data.map(item => new Season(item));
  } catch (error) {
    console.error('API fetchTvSeasons error:', error.message);
    return [];
  }
}

export async function fetchEpisodes(showId, seasonNumber) {
  try {
    const response = await fetch(`${BASE_URL}/tv/episodes/${encodeURIComponent(showId)}/${encodeURIComponent(seasonNumber)}`);
    if (!response.ok) throw new Error('Erro ao buscar episódios');
    const data = await response.json();
    return data.map(item => new Episode(item));
  } catch (error) {
    console.error('API fetchEpisodes error:', error.message);
    return [];
  }
}
