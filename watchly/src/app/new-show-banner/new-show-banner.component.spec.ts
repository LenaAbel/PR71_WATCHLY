import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShowBannerComponent } from './new-show-banner.component';

describe('NewShowBannerComponent', () => {
  let component: NewShowBannerComponent;
  let fixture: ComponentFixture<NewShowBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewShowBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewShowBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
