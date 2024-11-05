/*Defines the todo item*/
export interface ToDoItem{
    id:string;
    description: string;
    createdTime: string;
    done: Boolean;
    favorite:Boolean
}

export enum SortOptions{
    sortByDescription,
    sortByCreatedTime,
    hideDone
}