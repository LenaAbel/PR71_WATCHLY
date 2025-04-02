import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourShowsSectionComponent } from './your-shows-section.component';

describe('YourShowsSectionComponent', () => {
  let component: YourShowsSectionComponent;
  let fixture: ComponentFixture<YourShowsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourShowsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourShowsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
