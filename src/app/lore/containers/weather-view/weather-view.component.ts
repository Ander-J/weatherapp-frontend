import { Component, DoCheck, OnInit } from '@angular/core';
import { Weather } from '../../model/weather';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-view',
  templateUrl: './weather-view.component.html',
  styleUrls: ['./weather-view.component.scss']
})
export class WeatherViewComponent implements OnInit, DoCheck {
  weather: Weather = new Weather;
  bgImage: string = "";
  id: string;
  conditions: string;

  constructor(
    private weatherService: WeatherService,
  ) { }

  ngDoCheck(): void {
    if (this.id !== localStorage.getItem('id')) {
      this.id = localStorage.getItem('id')
      this.weather = this.weatherService.getById(this.id)
      this.updateBg()
    }
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id')
    this.weather = this.weatherService.getById(this.id)
    /* this.weatherService.get(this.id).subscribe(data => this.weather = data) */
    this.updateBg()
  }

  updateBg(): void {
    this.conditions = this.weather.weather
    this.bgImage = "/assets/weatherBg/" + this.conditions + ".png"
  }

}
