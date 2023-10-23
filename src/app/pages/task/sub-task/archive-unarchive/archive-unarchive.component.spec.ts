import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveUnarchiveComponent } from './archive-unarchive.component';

describe('ArchiveUnarchiveComponent', () => {
  let component: ArchiveUnarchiveComponent;
  let fixture: ComponentFixture<ArchiveUnarchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveUnarchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveUnarchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
