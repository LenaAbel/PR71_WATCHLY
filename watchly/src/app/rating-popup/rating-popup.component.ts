import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating-popup',
  templateUrl: './rating-popup.component.html'
})
/**
 * Component to display a rating popup for movies or series.
 * It allows users to select a rating from 1 to 5 stars.
 * @param showTitle - The title of the movie or series being rated.
 * @param isOpen - Boolean indicating whether the popup is open or closed.
 * @param close - Event emitter to close the popup.
 * @param ratingSubmitted - Event emitter to submit the selected rating.
 * @param stars - Array of numbers representing the star ratings (1 to 5). 
 * @param selectedRating - The currently selected rating.
 * @param hoverRating - The rating being hovered over by the user.
 */
export class RatingPopupComponent {
  @Input() showTitle: string = '';
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() ratingSubmitted = new EventEmitter<number>();

  stars: number[] = [1, 2, 3, 4, 5];
  selectedRating: number = 0;
  hoverRating: number = 0;

  setRating(rating: number): void {
    this.selectedRating = rating;
  }

  setHoverRating(rating: number): void {
    this.hoverRating = rating;
  }

  submitRating(): void {
    if (this.selectedRating > 0) {
      this.ratingSubmitted.emit(this.selectedRating);
      this.close.emit();
    }
  }

  closePopup(): void {
    this.close.emit();
  }
}
