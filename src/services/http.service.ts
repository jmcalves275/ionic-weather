import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  webcamKey = 'hX2wLuwMWCmshBfxrYaMOfd8ovqnp1fFf8KjsngsblAUbgP5JM';
  geoKey = 'AIzaSyA0WFpeLwtWs1yNcgdwS_GyFA199dOiVzU';
  constructor(private http: Http) { }

  // Get all posts from the API
  getWeather(city) {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=ae9d9a638a5bfe386ace3668a741780e')
      .map(res => res.json());
  }

  getCamera(lat, lng){
    let radius = 5;
    let header = new Headers();
    header.append('X-Mashape-Key', this.webcamKey);
    let options = new RequestOptions({ headers: header });

    return this.http.get('https://webcamstravel.p.mashape.com/webcams/list/nearby='+lat+','+lng+','+radius+'?lang=en&show=webcams:player', options)
      .map(res => res.json());

  }

  getCoordinates(city){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&key=' + this.geoKey)
      .map(res => res.json());
  }

}
