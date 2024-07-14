import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseTrackerPage } from './expense-tracker.page';

describe('ExpenseTrackerPage', () => {
  let component: ExpenseTrackerPage;
  let fixture: ComponentFixture<ExpenseTrackerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
