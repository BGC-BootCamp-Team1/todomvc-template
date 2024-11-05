import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  @Output() newItemDescription = new EventEmitter<string>();
  inputDescription: string = '';

  onEnter(event: any): void {
    this.inputDescription = event.target.value;
    this.newItemDescription.emit(this.inputDescription);
    event.target.value = '';
  }

}
