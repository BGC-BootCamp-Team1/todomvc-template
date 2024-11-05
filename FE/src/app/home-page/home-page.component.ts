import { Component } from '@angular/core';
import { SortOptions, ToDoItem } from '../models/todoitem.model';
import { ToDoDataService } from '../to-do-data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

const apiUrl = 'http://localhost:5010/api/v1/todoitems/'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  public searchBy: string = '';
  public displayItems: ToDoItem[] = [];
  loading = false;

  constructor(
    private toDoDataService: ToDoDataService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  public receiveSearchValueFromInput(searchBy: string) {
    //console.log(`receive ${searchBy}`);
    this.searchBy = searchBy;
    this.toDoDataService.searchBy = searchBy;
    this.displayItems = this.toDoDataService.displayItems;
  }

  public onClickCreateItem() {
    let newItem:ToDoItem={
      id: "new-item",
      description: '',
      createdTime: new Date().toString(),
      done: false,
      favorite: false,
    };
    this.router.navigate(['/detail']);
  }

  public onClickLabelHandler(item: ToDoItem) {
    console.log(`${item.description} selected home page`);
    this.router.navigate(['/detail', item.id]);
  }
  public onClickCheckBoxHandler(item: ToDoItem) {
    console.log(`${item.description} selected home page`);
    this.http.put(apiUrl+item.id, item).pipe(delay(1000)).subscribe({
      next: (response) => {
        this.toDoDataService.replaceItem(item);
        this.toDoDataService.updateDisplay();
      },
      error: (error) => {
        console.error('Error put item', error);
      }
    });
    
  }

  public reloadData(){
    this.loading = true;
    this.http.get(apiUrl).pipe(delay(1000)).subscribe({
      next: (response) => {
        this.toDoDataService.items = response as ToDoItem[];
        this.toDoDataService.updateDisplay();
        this.displayItems = [...this.toDoDataService.items];
      },
      error: (error) => {
        console.error('Error getting item', error);
      },
      complete: ()=>{
        this.loading=false
      }
    });
  }
  public applySort(sortOptions:SortOptions){
    this.displayItems = this.toDoDataService.applySort(sortOptions)
  }
}
