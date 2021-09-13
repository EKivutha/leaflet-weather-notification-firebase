import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedmapComponent } from './savedmap.component';

describe('SavedmapComponent', () => {
  let component: SavedmapComponent;
  let fixture: ComponentFixture<SavedmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
