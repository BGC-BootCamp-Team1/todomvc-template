import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './home-page/top-bar/top-bar.component';
import { ToDoItemComponent } from './to-do-item-list/to-do-item/to-do-item.component';
import { FilterAreaComponent } from './home-page/filter-area/filter-area.component';
import { ToDoItemListComponent } from './to-do-item-list/to-do-item-list.component';
import { CreateItemButtonComponent } from './home-page/create-item-button/create-item-button.component';
import { SearchAreaComponent } from './home-page/search-area/search-area.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoaderComponent } from './reloadable-area/loader/loader.component';
import { ReloadableAreaComponent } from './reloadable-area/reloadable-area.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ToDoItemComponent,
    FilterAreaComponent,
    ToDoItemListComponent,
    CreateItemButtonComponent,
    SearchAreaComponent,
    DetailPageComponent,
    HomePageComponent,
    LoaderComponent,
    ReloadableAreaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
