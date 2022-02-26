import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatInput } from '@angular/material/input';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Weather } from '../../model/weather';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-list',
  /* providers: [WeatherService], */
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})

export class WeatherListComponent implements OnInit {
  displayedColumns: string[] = ['location', 'degrees', 'weather', 'buttons'];
  dataSource: Weather[] = [];
  isViewVisible: boolean = true
  updated: boolean = false

  constructor(private router: Router, private weatherService: WeatherService) { }

  @ViewChild(MatTable) table: MatTable<Weather>;
  @ViewChild(MatInput) input: MatInput;
  @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;

  ngOnInit() {
    /* this.weatherService.getAll().subscribe(weatherlist => this.dataSource = weatherlist); */
    this.weatherService.updateGetAll().subscribe(weatherData => this.dataSource = weatherData)
  }


  weatherVisible(isVisible: boolean) {
    if (isVisible) {
      this.isViewVisible = true
    }
    this.isViewVisible = !this.isViewVisible
  }

  weatherDetails(id: string) {
    var navString = 'weather/'.concat(id)
    this.router.navigate([navString])
  }

  weatherHover(id: string) {
    localStorage.setItem('id', id)
    this.weatherVisible(true)
  }

  updateAllData() {
    this.weatherService.updateData().subscribe(data => this.dataSource = data, () => this.table.renderRows())
  }

  newWeather() {
    let newName = this.input.value
    this.weatherService.post(newName).subscribe(() => this.newWeatherUpdate())
    this.panel.close()
    this.input.value = ""
  }

  newWeatherUpdate() {
    this.weatherService.updateGetAll().subscribe(weatherData => this.dataSource = weatherData)
    this.table.renderRows()
  }

  deleteWeather(id: string) {
    this.weatherService.delete(id).subscribe()
    var count = 0;
    for (var data of this.dataSource) {
      if (data.id == id) {
        this.dataSource.splice(count, 1)
        this.table.renderRows()
      }
      count++
    }
  }
}
