import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodesSectionComponent } from './episodes-section.component';

describe('EpisodesSectionComponent', () => {
  let component: EpisodesSectionComponent;
  let fixture: ComponentFixture<EpisodesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisodesSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
