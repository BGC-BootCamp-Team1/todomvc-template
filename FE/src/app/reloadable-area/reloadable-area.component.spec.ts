import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadableAreaComponent } from './reloadable-area.component';

describe('ReloadableAreaComponent', () => {
  let component: ReloadableAreaComponent;
  let fixture: ComponentFixture<ReloadableAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReloadableAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReloadableAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
