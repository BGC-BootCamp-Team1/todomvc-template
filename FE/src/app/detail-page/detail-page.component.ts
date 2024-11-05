import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToDoDataService } from '../to-do-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoItem } from '../models/todoitem.model';
import { CanComponentDeactivate } from './back-to-home.guard';
import { HttpClient } from '@angular/common/http';
const apiUrl = 'http://localhost:5010/api/v1/todoitems/'
import { delay } from 'rxjs';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css',
})
export class DetailPageComponent implements OnInit,CanComponentDeactivate {
  public toDoItem: ToDoItem = {
    id: 'new-item',
    description: '',
    createdTime: new Date().toString(),
    done: false,
    favorite: false,
  };
  public itemId:string='';
  public formDirty: boolean = false;
  loading = false

  constructor(
    private toDoDataService: ToDoDataService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.itemId = params.get('id') as string;
      if(params.get('id')!==null){
        let getItem = this.toDoDataService.getById(this.itemId) as ToDoItem;
        if(getItem!==undefined){
          this.toDoItem = {
            id: getItem.id,
            description: getItem.description,
            createdTime: getItem.createdTime,
            done: getItem.done,
            favorite: getItem.favorite,
          };
        }
        
      }
    });
  }

  canDeactivate(): boolean {
    if (this.formDirty) {
      return confirm('Sure to discard changes?');
    }
    return true;
  }

  onFormChange(): void {
    this.formDirty = true;
  }

  public onClickDelete(){
    this.loading=true;
    console.log("delete clicked")
    let deleteConfirm = confirm('Sure to delete?');
    if(deleteConfirm){
      this.http.delete(apiUrl+this.toDoItem.id).pipe(delay(2000)).subscribe({
        next: (response) => {
          console.log('Item deleted successfully', response);
          this.toDoDataService.deleteItem(this.itemId);
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
    this.formDirty = false;
    this.router.navigate(['/home']);
  }

  public onClickSave(){
    console.log("save clicked")
    this.loading=true;
    if(this.itemId!==null){
      
      this.http.put(apiUrl+this.toDoItem.id,this.toDoItem).pipe(delay(2000)).subscribe({
        next: (response) => {
          console.log('Item put successfully', response);
          this.toDoDataService.replaceItem(this.toDoItem);
          this.toDoDataService.updateDisplay();
          this.formDirty = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error put item', error);
        },
        complete: ()=>{
          this.loading=false;
        }
      });
    }else{
      this.http.post(apiUrl, this.toDoItem).pipe(delay(2000)).subscribe({
        next: (response) => {
          console.log('Item posted successfully', response);
          this.toDoDataService.createItem(this.toDoItem);
          this.toDoDataService.updateDisplay();
          this.formDirty = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error posting item', error);
        }
      });
    }
    
  }

  public backToHome() {
    this.router.navigate(['/home']);
  }
}
