import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerBannerComponent } from './trailer-banner.component';

describe('TrailerBannerComponent', () => {
  let component: TrailerBannerComponent;
  let fixture: ComponentFixture<TrailerBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailerBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
