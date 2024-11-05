import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoItemComponent } from './to-do-item.component';
import { ToDoItem } from '../models/todoitem.model';
import { FormsModule } from '@angular/forms';

const toDoItem:ToDoItem= {
  id: 'item2',
  description: 'second item',
  createdTime: new Date(2024, 10, 14, 2, 30, 0, 0).toString(),
  done: false,
  favorite: false,
};

describe('ToDoItemComponent', () => {
  let component: ToDoItemComponent;
  let fixture: ComponentFixture<ToDoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToDoItemComponent],
      imports:[FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ToDoItemComponent);
    component = fixture.componentInstance;
    component.toDoItem = toDoItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
