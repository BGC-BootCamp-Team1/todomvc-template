import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDoItem } from '../../models/todoitem.model';
import { HttpClient } from '@angular/common/http';
import { ToDoDataService } from '../../to-do-data.service';
import { ActivatedRoute, Router } from '@angular/router';
const apiUrl = 'http://localhost:5010/api/v1/todoitems/'

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrl: './to-do-item.component.css',
})
export class ToDoItemComponent {
  @Input({ required: true }) public toDoItem!: ToDoItem;
  @Output() public itemChanged: EventEmitter<ToDoItem> = new EventEmitter();
  @Input() editValue: string = '';
  description: string = '';
  isEditing: boolean = false;
  loading: boolean = false;
  constructor(
    private toDoDataService: ToDoDataService,
    private http: HttpClient,
    // private router: Router
  ) {}

  enableEditing(): void {
    this.isEditing = true;
  }

  disableEditing(event: any): void {
    this.isEditing = false;
    this.description = event.target.value;
    this.toDoItem.description = this.description
    this.itemChanged.emit(this.toDoItem);
  }

  onEnter(): void {
    this.isEditing = false;
    this.toDoItem.description = this.description
    this.itemChanged.emit(this.toDoItem);
  }

  onBlur(): void {
    this.isEditing = false;
    this.toDoItem.description = this.description
    this.itemChanged.emit(this.toDoItem);
  }

  public onClickCheckBox() {
    this.toDoItem.done = !this.toDoItem.done;
    this.itemChanged.emit(this.toDoItem);
  }
  
  public onClickDelete(){
    this.loading=true;
    let deleteConfirm = confirm('Sure to delete?');
    if(deleteConfirm){
      this.http.delete(apiUrl+this.toDoItem.id).subscribe({
        next: (response) => {
          this.toDoDataService.deleteItem(this.toDoItem.id);
          this.toDoDataService.updateDisplay();
        },
        error: (error) => {
          console.error('Error delete item', error);
        },
        complete: ()=>{
          this.loading=false;
        }
      });
    }
    // this.router.navigate(['/all']);
  }
}
