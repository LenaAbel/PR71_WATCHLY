/**
 * Comment interface representing a comment on a show or episode.
 * @param comment_id - Unique identifier for the comment.
 * @param show_id - Unique identifier for the show.
 * @param person_id - Unique identifier for the person who made the comment.
 * @param episode_id - Unique identifier for the episode 
 * @param comment_text - The text of the comment.
 * @param comment_date - The date when the comment was made.
 * @param is_watched - Indicates if the comment is related to a watched episode. 
 * @param is_spoiler - Indicates if the comment contains spoilers.
 * @param username - The username of the person who made the comment 
 * @param show_name - The name of the show 
 * @param is_movie - Indicates if the comment is related to a movie 
 */
export interface Comment {
    comment_id: number;
    show_id: number;
    person_id: number;
    episode_id?: number;
    comment_text: string;
    comment_date: string;
    is_watched: boolean;
    is_spoiler: boolean;
    username?: string; 
    show_name?: string;
    is_movie?: boolean; 
}
