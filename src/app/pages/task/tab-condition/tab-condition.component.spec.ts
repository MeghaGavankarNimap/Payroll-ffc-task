import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabConditionComponent } from './tab-condition.component';

describe('TabConditionComponent', () => {
  let component: TabConditionComponent;
  let fixture: ComponentFixture<TabConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
