import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpEditTaskListComponent } from './emp-edit-task-list.component';

describe('EmpEditTaskListComponent', () => {
  let component: EmpEditTaskListComponent;
  let fixture: ComponentFixture<EmpEditTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpEditTaskListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpEditTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
