import { Component, EventEmitter, Output } from '@angular/core';
import { SortOptions } from '../models/todoitem.model';

@Component({
  selector: 'app-filter-area',
  templateUrl: './filter-area.component.html',
  styleUrl: './filter-area.component.css'
})
export class FilterAreaComponent {
  @Output() public sortOption:EventEmitter<SortOptions> = new EventEmitter();
  sortByDescription(){
    this.sortOption.emit(SortOptions.sortByDescription);
  }
  sortByCreatedTime(){
    this.sortOption.emit(SortOptions.sortByCreatedTime);
  }
  hideDone(){
    this.sortOption.emit(SortOptions.hideDone);
  }

}
