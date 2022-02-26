import { Component, ViewChild } from '@angular/core';
import { WeatherService } from './lore/services/weather.service';
import { Router } from '@angular/router';
import { WeatherListComponent } from './lore/containers/weather-list/weather-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weatherapp-frontend';
  myColor: "gray"

  constructor(private router: Router, private weatherService: WeatherService) { }

  @ViewChild(WeatherListComponent) list: WeatherListComponent;


  updateAll() {
    this.weatherService.updateGetAll().subscribe(() => this.list.newWeatherUpdate())

  }



}
