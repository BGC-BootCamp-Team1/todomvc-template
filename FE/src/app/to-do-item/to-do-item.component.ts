import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDoItem } from '../models/todoitem.model';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrl: './to-do-item.component.css'
})
export class ToDoItemComponent {
  @Input({required:true}) public toDoItem!:ToDoItem;
  @Output() public itemSelected:EventEmitter<ToDoItem> = new EventEmitter();
  @Output() public itemChanged:EventEmitter<ToDoItem> = new EventEmitter();

  public onClickCheckBox(){
    //console.log(`${this.toDoItem.description} selected`)
    this.toDoItem.done=!this.toDoItem.done
    this.itemChanged.emit(this.toDoItem);
  }

  public onClickLabel(){
    //console.log(`${this.toDoItem.description} selected`)
    this.itemSelected.emit(this.toDoItem);
  }
  public onClickFavorite(){
    this.toDoItem.favorite=!this.toDoItem.favorite
    this.itemChanged.emit(this.toDoItem);
  }
}
