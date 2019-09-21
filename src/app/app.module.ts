import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MaterialModule } from './material.module';
import { AppComponent } from './root/app.component';
import { UserControlsComponent } from './components/user-controls/user-controls.component';
import { PlayAreaComponent } from './components/play-area/play-area.component';
import { HomeComponent } from './components/home/home.component';
import { GameOverDialogComponent } from './dialogs/game-over/game-over.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    UserControlsComponent,
    PlayAreaComponent,
    HomeComponent,
    GameOverDialogComponent,
  ],
  entryComponents: [GameOverDialogComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ preventDuplicates: true }),
    MaterialModule,
    routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
