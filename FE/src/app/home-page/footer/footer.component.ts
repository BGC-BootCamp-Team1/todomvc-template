import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FilterOptions } from '../../models/todoitem.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Output() public filterOption:EventEmitter<FilterOptions> = new EventEmitter();
  @Output() public clearCompleted:EventEmitter<void> = new EventEmitter();
  @Input() public numItemsLeft: number = 0
  @Input() public existCompleted: boolean = false;
  showAll(){
    this.filterOption.emit(FilterOptions.All);
  }
  filterActiveItems(){
    this.filterOption.emit(FilterOptions.Active);
  }
  filterCompletedItems(){
    this.filterOption.emit(FilterOptions.Completed);
  }

  onClickClearCompleted(){
    this.clearCompleted.emit();
  }
}
