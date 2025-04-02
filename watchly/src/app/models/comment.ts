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
}
