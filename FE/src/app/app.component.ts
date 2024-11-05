import { Component, OnInit, Output } from '@angular/core';
import { ToDoDataService } from './to-do-data.service';
import { Router } from '@angular/router';
import { ToDoItem } from './models/todoitem.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ToDoList';

  constructor(private toDoDataService: ToDoDataService,
    private router: Router) {
  }

  ngOnInit(): void {

  }

}
