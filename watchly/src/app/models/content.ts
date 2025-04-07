/**
 * Content model for representing movies and series.
 * @param show_id - Unique identifier for the show.
 * @param name - Name of the show.
 * @param description - Description of the show.
 * @param released_date - Release date of the show.
 * @param nationality - The nationality of the show.
 * @param trailer_link - Link to the trailer of the show.
 * @param status - Status of the show (e.g., ongoing, completed).
 * @param duration - Duration of the show in minutes.
 * @param is_movie - Indicates if the show is a movie.
 * @param is_rated - Indicates if the show has a rating.
 * @param is_displayed - Indicates if the show is displayed.
 * @param Genres - Array of genres associated with the show.
 * @param Favorite - Indicates if the show is marked as favorite.
 * @param imdb_rating - IMDb rating of the show.
 * @param rating - TMDB rating of the show on a 5-scale.
 * @param season - Season number for the episode.
 * @param number - Episode number.
 * @param episodes - Total number of episodes in the series or season.
 * @param seasons - Total number of seasons in the series.
 * @param thumbnail - Thumbnail image URL for the show.
 */
export class Content {
  // Show properties
  show_id!: number;
  name!: string;
  description!: string;
  released_date!: string;
  nationality!: string;
  trailer_link!: string;
  status!: string;
  duration!: number;
  is_movie!: boolean;
  is_rated!: boolean;
  is_displayed!: boolean;
  Genres!: any[];
  Favorite!: any;
  imdb_rating?: number;
  rating?: number;  // TMDB rating on 5-scale
  // Episode properties
  season!: number; // Season number for the episode
  number!: number; // Episode number
  episodes!: number; // Total number of episodes (in the series or season)
  seasons!: number; // Total number of seasons
  thumbnail!: string; // Thumbnail image URL

  constructor(
    show_id: number,
    name: string,
    description: string,
    released_date: string,
    nationality: string,
    trailer_link: string,
    status: string,
    duration: number,
    is_movie: boolean,
    season: number,
    number: number,
    episodes: number,
    seasons: number,
    thumbnail: string,
    imdb_rating?: number,
    rating?: number,
    is_displayed: boolean = true,
  ) {
    // Show properties
    this.show_id = show_id;
    this.name = name;
    this.description = description;
    this.released_date = released_date;
    this.nationality = nationality;
    this.trailer_link = trailer_link;
    this.status = status;
    this.duration = duration;
    this.is_movie = is_movie;
    this.is_displayed = is_displayed;
    // Episode properties
    this.season = season;
    this.number = number;
    this.episodes = episodes;
    this.seasons = seasons;
    this.thumbnail = thumbnail;
    this.imdb_rating = imdb_rating;
    this.rating = rating;
  }
}
