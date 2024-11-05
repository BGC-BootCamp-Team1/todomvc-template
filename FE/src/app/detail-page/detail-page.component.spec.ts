import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPageComponent } from './detail-page.component';
import { FormsModule } from '@angular/forms';
import { ToDoDataService } from '../to-do-data.service';
import { toDoItemsData } from '../mock/todoitems.mock';
import { of } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetailPageComponent', () => {
  let component: DetailPageComponent;
  let fixture: ComponentFixture<DetailPageComponent>;
  let toDoDataServiceSpy: jasmine.SpyObj<ToDoDataService>;

  beforeEach(async () => {
    toDoDataServiceSpy = jasmine.createSpyObj('ToDoDataService', ['getData'])
    let httpClientSpy = jasmine.createSpyObj('HttpClient', {
      get: of(toDoItemsData)
    })
    await TestBed.configureTestingModule({
      declarations: [DetailPageComponent],
      imports:[FormsModule,RouterTestingModule],
      providers:[
        {
          provide: ToDoDataService,
          useValue: toDoDataServiceSpy
        },
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }

      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
