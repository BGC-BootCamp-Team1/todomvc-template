import { Component, EventEmitter, Output } from '@angular/core';
import { FilterOptions } from '../../models/todoitem.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Output() public filterOption:EventEmitter<FilterOptions> = new EventEmitter();
  showAll(){
    this.filterOption.emit(FilterOptions.All);
  }
  filterActiveItems(){
    this.filterOption.emit(FilterOptions.Active);
  }
  filterCompletedItems(){
    this.filterOption.emit(FilterOptions.Completed);
  }


}
