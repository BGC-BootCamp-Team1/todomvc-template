import { Component, inject } from '@angular/core';
import { FilterOptions, ToDoItem } from '../models/todoitem.model';
import { ToDoDataService } from '../to-do-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import { Location } from '@angular/common';

const apiUrl = 'http://localhost:5010/api/v1/todoitems/';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  public searchBy: string = '';
  public displayItems: ToDoItem[] = [];
  loading = true;
  // filteredTodos: ToDoItem[] = this.displayItems;
  private location = inject(Location);

  constructor(
    private toDoDataService: ToDoDataService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reloadData();
      this.applySort();
    });
    // this.reloadData();
    // this.applySort(FilterOptions.All);
    
    // console.log(this.displayItems)
    // this.route.url.subscribe(url => {
    //   const path = url[0]?.path || 'all';
    //   if (path === 'active') {
    //     this.applySort(SortOptions.Active)
    //   } else if (path === 'completed') {
    //     this.applySort(SortOptions.Completed)
    //   }
    // });
    // console.log(this.displayItems)
  }

  public receiveSearchValueFromInput(searchBy: string) {
    this.searchBy = searchBy;
    this.toDoDataService.searchBy = searchBy;
    this.displayItems = this.toDoDataService.displayItems;
  }

  public itemChangeHandler(item: ToDoItem) {
    this.http.put(apiUrl + item.id, item).subscribe({
      next: (response) => {
        this.toDoDataService.replaceItem(item);
        this.toDoDataService.updateDisplay();
        this.reloadData();
      },
      error: (error) => {
        console.error('Error put item', error);
      },
    });
  }
  public itemDeletedHandler(item: ToDoItem) {
    this.http.delete(apiUrl+item.id).subscribe({
      next: (response) => {
        this.toDoDataService.deleteItem(item.id);
        this.toDoDataService.updateDisplay();
        this.reloadData();
      },
      error: (error) => {
        console.error('Error delete item', error);
      },
      complete: ()=>{
        this.loading=false;
      }
    });
  }
  

  public reloadData() {
    this.loading = true;
    this.http.get(apiUrl).subscribe({
      next: (response) => {
        this.toDoDataService.items = response as ToDoItem[];
        this.toDoDataService.updateDisplay();
        this.displayItems = [...this.toDoDataService.items];
        this.applySort();
      },
      error: (error) => {
        console.error('Error getting item', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  public applySort() {
    const filter = this.location.path().split('/')[1] || 'all';
    let filterOption:FilterOptions;
    switch(filter){
      case 'active':
        filterOption = FilterOptions.Active;
        break;
      case 'completed':
        filterOption = FilterOptions.Completed;
        break;
      default:
        filterOption = FilterOptions.All;
        break;
    }
    this.displayItems = this.toDoDataService.applySort(filterOption);
  }

  public getNumItemsLeft(): number {
    return this.displayItems.filter((item) => item.done === false).length;
  }

  handleNewDescriptionValue(newItemDescription: string): void {
    this.loading = true;
    let toDoItem: ToDoItem = {
      id: 'new-item',
      description: newItemDescription,
      createdTime: new Date().toString(),
      done: false,
      favorite: false,
    };
    this.http.post(apiUrl, toDoItem).subscribe({
      next: (response) => {
        this.toDoDataService.createItem(toDoItem);
        this.toDoDataService.updateDisplay();
        this.reloadData();
      },
      error: (error) => {
        console.error('Error posting item', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  existCompleted(): boolean {
    return this.displayItems.some((item) => item.done === true);
  }

  clearCompleted() {
    console.log('clear completed');
    let deleteConfirm = confirm('Sure to clear completed?');
    if (deleteConfirm) {
      this.displayItems
        .filter((item) => item.done === true)
        .forEach((item) => {
          this.loading = true;

          this.http.delete(apiUrl + item.id).subscribe({
            next: (response) => {
              this.toDoDataService.deleteItem(item.id);
              this.toDoDataService.updateDisplay();
              this.reloadData();
            },
            error: (error) => {
              console.error('Error delete item', error);
            },
            complete: () => {
              this.loading = false;
            },
          });
        });
    }
  }
}
