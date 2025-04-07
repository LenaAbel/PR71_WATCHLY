/**
 * Show model
 * Represents a movie or series with various attributes.
 * @param show_id - Unique identifier for the show.
 * @param title - Title of the show.
 * @param status - Status of the show (e.g., ongoing, completed).           
 * @param year - Year of release.
 * @param seasons - Number of seasons (for series).
 * @param episodes - Number of episodes (for series).
 * @param duration - Duration of the show (e.g., 2h 30m).
 * @param language - Language of the show.
 * @param director - Director of the show (for movies).
 * @param description - Description of the show.
 * @param imageUrl - URL of the show's image.
 * @param rating - Rating of the show (e.g., 4.5).
 * @param genres - Array of genres associated with the show.
 */
export class Show {
  show_id!: number; 
  title!: string;
  status?: string;       // for series
  year!: number;
  seasons?: number;      // for series
  episodes?: number;     // for series
  duration!: string;
  language!: string;
  director?: string;     // for movies
  description!: string;
  imageUrl?: string;
  rating?: number;
  genres: string[] = [];

  constructor(data: Partial<Show> = {}) {
    Object.assign(this, data);
  }
}
