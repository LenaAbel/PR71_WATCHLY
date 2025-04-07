import { Component, Input, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-poster-grid',
  templateUrl: './poster-grid.component.html',
  styleUrls: ['./poster-grid.component.css']
})
/**
 * Component to display a grid of images (posters).
 * It adjusts the grid layout based on the size of the images.
 * @param images - Array of image URLs to be displayed in the grid.
 * @param page - The page where the poster grid is displayed.
 * @param imageContainers - QueryList of image container elements for layout adjustment.
 * @param selectedImage - The currently selected image for viewing in a larger format.
 */
export class PosterGridComponent implements OnInit, OnDestroy {

  @Input() images: any[] = [];
  @Input() page!: string;
  @ViewChildren('imageContainer') imageContainers!: QueryList<ElementRef>;

  selectedImage: string | null = null;

  ngOnInit() {
    window.addEventListener('resize', this.adjustGridLayout.bind(this));
    setTimeout(() => this.adjustGridLayout(), 100);
  }

  ngAfterViewInit() {
    this.adjustGridLayout();
  }

  onImageLoad() {
    this.adjustGridLayout();
  }

  adjustGridLayout() {
    this.imageContainers.forEach((containerRef: ElementRef) => {
      const container = containerRef.nativeElement as HTMLElement;
      const img = container.querySelector('img') as HTMLImageElement;
      if (img && img.complete) {
        container.style.gridRowEnd = `span ${Math.ceil(img.naturalHeight / img.naturalWidth * 2)}`;
      }
    });
  }

  openImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  closeImage() {
    this.selectedImage = null;
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.adjustGridLayout.bind(this));
  }
}
