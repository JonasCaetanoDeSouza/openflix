import { Media, StreamingResponse } from './types';

const BASE_URL = 'https://vps60602.publiccloud.com.br/api/v1';

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
