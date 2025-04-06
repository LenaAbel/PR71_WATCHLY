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
