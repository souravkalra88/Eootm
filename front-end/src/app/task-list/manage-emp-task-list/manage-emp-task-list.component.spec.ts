import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmpTaskListComponent } from './manage-emp-task-list.component';

describe('ManageEmpTaskListComponent', () => {
  let component: ManageEmpTaskListComponent;
  let fixture: ComponentFixture<ManageEmpTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEmpTaskListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmpTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
