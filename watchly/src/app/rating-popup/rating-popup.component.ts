import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating-popup',
  templateUrl: './rating-popup.component.html'
})
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
