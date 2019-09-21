import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { MaterialModule } from './material.module';
import { AppComponent } from './root/app.component';
import { PlayAreaComponent } from './components/play-area/play-area.component';
import { HomeComponent } from './components/home/home.component';
import { GameOverDialogComponent } from './dialogs/game-over/game-over.component';
import { routing } from './app.routing';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayAreaComponent,
    HomeComponent,
    GameOverDialogComponent,
  ],
  entryComponents: [GameOverDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ preventDuplicates: true }),
    MaterialModule,
    NgxWebstorageModule.forRoot(),
    routing,
  ],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
