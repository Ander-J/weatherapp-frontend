import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherListComponent } from './lore/containers/weather-list/weather-list.component';
import { WeatherViewComponent } from './lore/containers/weather-view/weather-view.component';

const routes: Routes = [
  { path: 'list', component: WeatherListComponent },
  { path: 'weather/:id', component: WeatherViewComponent },
  { path: '**', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
