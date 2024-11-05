import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { ToDoDataService } from '../to-do-data.service';
import { toDoItemsData } from '../mock/todoitems.mock';
import { of } from "rxjs";
import { HttpClient } from '@angular/common/http';
import {MockComponent} from "ng-mocks";
import { TopBarComponent } from './top-bar/top-bar.component';
import { SearchAreaComponent } from './search-area/search-area.component';
import { FilterAreaComponent } from './filter-area/filter-area.component';
import { ToDoItemListComponent } from '../to-do-item-list/to-do-item-list.component';
import { CreateItemButtonComponent } from './create-item-button/create-item-button.component';
import { ReloadableAreaComponent } from '../reloadable-area/reloadable-area.component';
describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let toDoDataServiceSpy: jasmine.SpyObj<ToDoDataService>;

  beforeEach(async () => {
    toDoDataServiceSpy = jasmine.createSpyObj('ToDoDataService', ['getData'])
    let httpClientSpy = jasmine.createSpyObj('HttpClient', {
      get: of(toDoItemsData)
    })
    await TestBed.configureTestingModule({
      declarations: [
        HomePageComponent,
        MockComponent(TopBarComponent),
        MockComponent(SearchAreaComponent),
        MockComponent(FilterAreaComponent),
        MockComponent(ToDoItemListComponent),
        MockComponent(CreateItemButtonComponent),
        MockComponent(ReloadableAreaComponent)
      ],
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
    
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
