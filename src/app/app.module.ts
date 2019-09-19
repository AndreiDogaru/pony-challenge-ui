import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './root/app.component';
import { UserControlsComponent } from './components/user-controls/user-controls.component';
import { PlayAreaComponent } from './components/play-area/play-area.component';

@NgModule({
  declarations: [
    AppComponent,
    UserControlsComponent,
    PlayAreaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
