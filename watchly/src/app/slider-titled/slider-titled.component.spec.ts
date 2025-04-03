import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderTitledComponent } from './slider-titled.component';

describe('SliderTitledComponent', () => {
  let component: SliderTitledComponent;
  let fixture: ComponentFixture<SliderTitledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderTitledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderTitledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
