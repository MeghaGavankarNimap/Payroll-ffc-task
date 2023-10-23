import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialTaskCompleteDialogComponent } from './partial-task-complete-dialog.component';

describe('PartialTaskCompleteDialogComponent', () => {
  let component: PartialTaskCompleteDialogComponent;
  let fixture: ComponentFixture<PartialTaskCompleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartialTaskCompleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialTaskCompleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
