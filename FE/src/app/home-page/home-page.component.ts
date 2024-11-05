import { Component } from '@angular/core';
import { FilterOptions, ToDoItem } from '../models/todoitem.model';
import { ToDoDataService } from '../to-do-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

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
  filteredTodos: ToDoItem[] = [];

  constructor(
    private toDoDataService: ToDoDataService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reloadData();
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

  // public onClickCreateItem() {
  //   let newItem:ToDoItem={
  //     id: "new-item",
  //     description: '',
  //     createdTime: new Date().toString(),
  //     done: false,
  //     favorite: false,
  //   };
  //   this.router.navigate(['/detail']);
  // }

  // public onClickLabelHandler(item: ToDoItem) {
  //   console.log(`${item.description} selected home page`);
  //   this.router.navigate(['/detail', item.id]);
  // }
  public itemChangeHandler(item: ToDoItem) {
    this.http
      .put(apiUrl + item.id, item)
      .pipe(delay(1000))
      .subscribe({
        next: (response) => {
          this.toDoDataService.replaceItem(item);
          this.toDoDataService.updateDisplay();
        },
        error: (error) => {
          console.error('Error put item', error);
        },
      });
  }

  public reloadData() {
    this.loading = true;
    this.http
      .get(apiUrl)
      .pipe(delay(1000))
      .subscribe({
        next: (response) => {
          this.toDoDataService.items = response as ToDoItem[];
          this.toDoDataService.updateDisplay();
          this.displayItems = [...this.toDoDataService.items];
          this.router.events.subscribe(() => {
            const path = this.route.snapshot.fragment || 'all';
            this.filterTodos(path);
          });
          console.log(this.filteredTodos);
        },
        error: (error) => {
          console.error('Error getting item', error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  private filterTodos(path: string): void {
    this.filteredTodos = this.displayItems.filter((todo) => {
      if (path === 'active') {
        return !todo.done;
      } else if (path === 'completed') {
        return todo.done;
      } else {
        return true;
      }
    });
  }
  public applySort(sortOptions: FilterOptions) {
    this.displayItems = this.toDoDataService.applySort(sortOptions);
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
    this.http
      .post(apiUrl, toDoItem)
      .pipe(delay(1000))
      .subscribe({
        next: (response) => {
          this.toDoDataService.createItem(toDoItem);
          this.toDoDataService.updateDisplay();
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

          this.http
            .delete(apiUrl + item.id)
            .pipe(delay(1000))
            .subscribe({
              next: (response) => {
                this.toDoDataService.deleteItem(item.id);
                this.toDoDataService.updateDisplay();
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
