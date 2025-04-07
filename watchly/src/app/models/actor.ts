/**
 * Represents an actor in a movie or series.
 * @param name - The name of the actor.
 * @param character - The character played by the actor.
 * @param profile_path - The path to the actor's profile image.
 */
export class Actor {
  constructor(
    public name: string,
    public character: string,
    public profile_path: string
  ) {}
}
