import { ToDoItem } from "../models/todoitem.model";

export const toDoItemsData: ToDoItem[] =[
    {
        id:"item1",
        description: "first item",
        createdTime: new Date(2024, 10, 14, 1, 30, 0, 0).toString(),
        done: false,
        favorite:false
    },
    {
        id:"item2",
        description: "second item",
        createdTime: new Date(2024, 10, 14, 2, 30, 0, 0).toString(),
        done: false,
        favorite:false
    },
    {
        id:"item3",
        description: "third item",
        createdTime: new Date(2024, 10, 14, 3, 30, 0, 0).toString(),
        done: false,
        favorite:false
    }
]