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

  public itemChangeHandler(toDoItem:ToDoItem){
    this.itemChanged.emit(toDoItem);
  }

}
