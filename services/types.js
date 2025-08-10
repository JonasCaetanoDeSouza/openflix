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

export class Episode {
  constructor({
    air_date,
    episode_number,
    episode_type,
    id,
    name,
    overview,
    production_code,
    runtime,
    season_number,
    show_id,
    still_path,
    vote_average,
    vote_count,
    crew,
    guest_stars,
    still_url,
  }) {
    this.air_date = air_date;
    this.episode_number = episode_number;
    this.episode_type = episode_type;
    this.id = id;
    this.name = name;
    this.overview = overview;
    this.production_code = production_code;
    this.runtime = runtime;
    this.season_number = season_number;
    this.show_id = show_id;
    this.still_path = still_path;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.crew = crew;
    this.guest_stars = guest_stars;
    this.still_url = still_url;
  }

  get displayTitle() {
    return `Ep ${this.episode_number} - ${this.name}`;
  }
}
