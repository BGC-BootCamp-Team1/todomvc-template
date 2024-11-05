import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrl: './search-area.component.css'
})
export class SearchAreaComponent implements OnInit{
  public searchValue: string = '';
  @Output() public outputSearchValue:EventEmitter<string> = new EventEmitter();
  @Output() public outputReloadClicked:EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
  }

  public onSearching(){
    this.outputSearchValue.emit(this.searchValue);
  }
  public onClickReload(){
    console.log("reload click");
    this.searchValue = '';
    this.outputReloadClicked.emit();
  }
}
