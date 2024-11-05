import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToDoItem } from "../models/todoitem.model";

@Component({
  selector: 'app-to-do-item-list',
  templateUrl: './to-do-item-list.component.html',
  styleUrl: './to-do-item-list.component.css'
})
export class ToDoItemListComponent{
  @Input({required:true}) displayItems:ToDoItem[]=[]
  @Output() public itemChanged:EventEmitter<ToDoItem> = new EventEmitter();
  selectAll: boolean = false;

  toggleAll(event: any): void {
    const checked = event.target.checked;
    this.displayItems.forEach(todo => {
      todo.done = checked; 
      this.itemChanged.emit(todo);
    });
  }


  updateSelectAllState(): void {
    this.selectAll = this.displayItems.every(todo => todo.done);
  }

  public itemChangeHandler(toDoItem:ToDoItem){
    this.itemChanged.emit(toDoItem);
  }

}
