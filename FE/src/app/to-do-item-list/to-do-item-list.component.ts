import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToDoItemComponent } from './to-do-item/to-do-item.component';
import { toDoItemsData } from '../mock/todoitems.mock';
import { ToDoItem } from "../models/todoitem.model";

@Component({
  selector: 'app-to-do-item-list',
  templateUrl: './to-do-item-list.component.html',
  styleUrl: './to-do-item-list.component.css'
})
export class ToDoItemListComponent{
  @Input({required:true}) displayItems:ToDoItem[]=[]
  @Output() public itemSelected:EventEmitter<ToDoItem> = new EventEmitter();
  @Output() public itemChanged:EventEmitter<ToDoItem> = new EventEmitter();

  public onClickLabelHandler(toDoItem:ToDoItem){
    //console.log(`${this.toDoItem.description} selected`)
    this.itemSelected.emit(toDoItem);
  }

  public onClickCheckBoxHandler(toDoItem:ToDoItem){
    //console.log(`${this.toDoItem.description} selected`)
    this.itemChanged.emit(toDoItem);
  }

}
