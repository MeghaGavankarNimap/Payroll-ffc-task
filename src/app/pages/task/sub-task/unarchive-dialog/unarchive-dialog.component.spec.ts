import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnarchiveDialogComponent } from './unarchive-dialog.component';

describe('UnarchiveDialogComponent', () => {
  let component: UnarchiveDialogComponent;
  let fixture: ComponentFixture<UnarchiveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnarchiveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnarchiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
