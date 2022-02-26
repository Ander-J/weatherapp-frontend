import { Weather } from "../model/weather";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Injectable, Output } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    private apiUrl = 'http://localhost:8080/api/weatherapp/weather'
    weatherData: Weather[]

    constructor(private http: HttpClient) { }

    getAll(): Weather[] {
        return this.weatherData
    }

    getById(id: string) {
        for (var weather of this.weatherData) {
            if (weather.id == id) {
                return weather
            }
        }
        return null
    }

    updateGetAll(): Observable<Weather[]> {
        let obsData: Observable<Weather[]>;
        obsData = this.http
            .get<Weather[]>(this.apiUrl)
            .pipe(map(data => data), catchError(this.handleError))

        obsData.subscribe(weatherList => this.weatherData = weatherList)


        return obsData
        /* .subscribe(weatherlist => this.weatherData = weatherlist) */
        /* return this.http
            .get<Weather[]>(this.apiUrl)
            .pipe(map(data => data), catchError(this.handleError)) */
        /* return this.weatherData */
    }

    get(id: string): Observable<Weather> {
        return this.http
            .get<Weather>(`${this.apiUrl}/${id}`)
            .pipe(map(data => data), catchError(this.handleError))
    }

    updateData(): Observable<Weather[]> {
        let obsData: Observable<Weather[]>;
        obsData = this.http
            .get<Weather[]>(`${this.apiUrl}/update`)
            .pipe(map(data => data), catchError(this.handleError))

        obsData.subscribe(weatherList => this.weatherData = weatherList)

        return obsData
    }

    delete(id: string) {
        return this.http.delete(`${this.apiUrl}/delete/${id}`).pipe(catchError(this.handleError))
    }

    post(loc: string) {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'text/plain')

        return this.http.post<string>(`${this.apiUrl}/new`, loc)
            .pipe(catchError(this.handleError))
    }

    private handleError(res: HttpErrorResponse | any) {
        console.error(res.error || res.body.error);
        return throwError(res.error || 'Backend error');
    }
}