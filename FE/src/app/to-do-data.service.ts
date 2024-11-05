import { Injectable } from '@angular/core';
import { FilterOptions, ToDoItem } from './models/todoitem.model';
import { toDoItemsData } from './mock/todoitems.mock';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoDataService {
  public items: ToDoItem[] = [];
  private listSearchValue: string = '';
  public displayItems:  ToDoItem[] =[...this.items] ;

  constructor() { }
  
  public getData(){
    return this.items;

  }
  public getById(itemId:string){
    return this.items.find(item=>item.id===itemId)
  }

  public createItem(newItem:ToDoItem){
    this.items.push(newItem);
    return newItem;
  }
  public deleteItem(itemId:string){
    let itemToDelete = this.items.find(item=>item.id===itemId)
    if (itemToDelete!==undefined){
      let deleteIndex = this.items.indexOf(itemToDelete);
      this.items.splice(deleteIndex,1);
    }
  }

  public replaceItem(item:ToDoItem){
    let itemToReplace = this.items.find(i=>i.id===item.id)
    if (itemToReplace!==undefined){
      let replaceIndex = this.items.indexOf(itemToReplace);
      item.createdTime=this.items[replaceIndex].createdTime;
      this.items[replaceIndex] = item;
    }
  }


  public get searchBy():string{
    return this.listSearchValue;
  }

  public set searchBy(value:string){
    this.listSearchValue = value;
    this.displayItems = this.searchBy? this.performFilter(value):this.items;
  }

  private performFilter(filterBy: string):ToDoItem[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.items.filter(
      (toDoItem:ToDoItem) =>
        toDoItem.description.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase())!==-1
    );
  }

  public updateDisplay(){
    this.displayItems=[...this.items] ;
  }

  public applySort(sortOptions:FilterOptions){
    if(sortOptions===FilterOptions.Active){
      return([...this.displayItems.filter((a)=>a.done===false)]);
    }else if(sortOptions===FilterOptions.Completed){
      return([...this.displayItems.filter((a)=>a.done===true)]);
    }else{
      return([...this.displayItems]);
    }

  }
}
