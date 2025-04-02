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
  Genres!: any[];
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
    thumbnail: string
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
    // Episode properties
    this.season = season;
    this.number = number;
    this.episodes = episodes;
    this.seasons = seasons;
    this.thumbnail = thumbnail;
  }
}
