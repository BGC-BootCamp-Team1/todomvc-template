import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { FilterOptions } from '../../models/todoitem.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  @Output() public filterOption: EventEmitter<string> =
    new EventEmitter();
  @Output() public clearCompleted: EventEmitter<void> = new EventEmitter();
  @Input() public numItemsLeft: number = 0;
  @Input() public existCompleted: boolean = false;
  private location = inject(Location);

  get filter(): string {
    return this.location.path().split('/')[1] || 'all';
  }

  onClickClearCompleted() {
    this.clearCompleted.emit();
  }

  onClick(){
    this.filterOption.emit(this.filter)
  }
}
