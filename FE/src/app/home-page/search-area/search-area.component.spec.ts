import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAreaComponent } from './search-area.component';
import { FormsModule } from '@angular/forms';

describe('SearchAreaComponent', () => {
  let component: SearchAreaComponent;
  let fixture: ComponentFixture<SearchAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchAreaComponent],
      imports:[FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
