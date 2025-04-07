import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actorNameFormat'
})
/**
 * Pipe to format actor names by removing additional information in parentheses.
 * @param actor - The actor object containing the name to be formatted.
 */
export class ActorNameFormatPipe implements PipeTransform {
  transform(actor: any): any {
    if (!actor || !actor.name) return actor;
    
    // Split name by parentheses and get the main name part
    const nameParts = actor.name.split('(');
    actor.name = nameParts[0].trim();
    
    // Join additional info in parentheses if they exist
    if (nameParts.length > 1) {
      actor.role = '(' + nameParts.slice(1).join('(').trim();
    }
    
    return actor;
  }
}
