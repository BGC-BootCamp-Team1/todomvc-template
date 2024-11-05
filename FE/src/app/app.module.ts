import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './home-page/top-bar/top-bar.component';
import { ToDoItemComponent } from './to-do-item-list/to-do-item/to-do-item.component';
import { ToDoItemListComponent } from './to-do-item-list/to-do-item-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoaderComponent } from './reloadable-area/loader/loader.component';
import { ReloadableAreaComponent } from './reloadable-area/reloadable-area.component';
import { FooterComponent } from './home-page/footer/footer.component';
import { InfoComponent } from './home-page/info/info.component';



@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ToDoItemComponent,
    ToDoItemListComponent,
    HomePageComponent,
    LoaderComponent,
    ReloadableAreaComponent,
    FooterComponent,
    InfoComponent
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
