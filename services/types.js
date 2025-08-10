export class Media {
  constructor({
    adult,
    backdrop_path,
    id,
    title,
    name,
    original_title,
    overview,
    poster_path,
    media_type,
    original_language,
    genre_ids,
    popularity,
    release_date,
    video,
    vote_average,
    vote_count,
    backdrop_url,
    poster_url,
  }) {
    this.adult = adult;
    this.backdrop_path = backdrop_path;
    this.id = id;
    this.title = title;
    this.name = name;
    this.original_title = original_title;
    this.overview = overview;
    this.poster_path = poster_path;
    this.media_type = media_type;
    this.original_language = original_language;
    this.genre_ids = genre_ids;
    this.popularity = popularity;
    this.release_date = release_date;
    this.video = video;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.backdrop_url = backdrop_url;
    this.poster_url = poster_url;
  }

  get displayTitle() {
    return this.title || this.name || '';
  }
}

export class StreamingResponse {
  constructor(
    { video }) {
    this.video = video;
  }
}

export class Season {
  constructor({
    airDate,
    episodeCount,
    id,
    name,
    overview,
    posterPath,
    seasonNumber,
    voteAverage,
    posterUrl,
  }) {
    this.airDate = airDate;
    this.episodeCount = episodeCount;
    this.id = id;
    this.name = name;
    this.overview = overview;
    this.posterPath = posterPath;
    this.seasonNumber = seasonNumber;
    this.voteAverage = voteAverage;
    this.posterUrl = posterUrl;
  }

  get displayName() {
    return this.name || `Temporada ${this.seasonNumber}`;
  }

  get fullPosterUrl() {
    return this.posterUrl || `https://image.tmdb.org/t/p/w500${this.posterPath}`;
  }
}
