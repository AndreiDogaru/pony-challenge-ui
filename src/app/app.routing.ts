import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PlayAreaComponent } from './components/play-area/play-area.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'play', component: PlayAreaComponent },
  { path: '**', redirectTo: '/home' }
];

export const routing = RouterModule.forRoot(appRoutes);
