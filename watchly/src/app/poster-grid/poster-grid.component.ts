import { Component, Input, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-poster-grid',
  templateUrl: './poster-grid.component.html',
  styleUrls: ['./poster-grid.component.css']
})
export class PosterGridComponent implements OnInit, OnDestroy {

  @Input() images: any[] = [];
  @Input() page!: string;
  @ViewChildren('imageContainer') imageContainers!: QueryList<ElementRef>;

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

  ngOnDestroy() {
    window.removeEventListener('resize', this.adjustGridLayout.bind(this));
  }
}
