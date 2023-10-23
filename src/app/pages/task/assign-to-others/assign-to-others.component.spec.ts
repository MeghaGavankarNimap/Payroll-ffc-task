import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignToOthersComponent } from './assign-to-others.component';

describe('AssignToOthersComponent', () => {
  let component: AssignToOthersComponent;
  let fixture: ComponentFixture<AssignToOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignToOthersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignToOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
