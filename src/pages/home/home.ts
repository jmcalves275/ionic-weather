import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { HttpService } from '../../services/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalPage } from '../modal/modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  city = 'London';
  temperature = '';
  description = '';
  descriptionArray = [];
  items = [];
  showCam = false;
  camera;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public http: HttpService, public loadingCtrl: LoadingController, public sanitizer: DomSanitizer) {
    this.refresh();

  }

  openModal() {

    let search = this.modalCtrl.create(ModalPage);
    search.present();
    search.onDidDismiss((data) => {
      if(data){
        this.showCam = false;
        this.city = data;
        this.refresh();
      }
    })

  }

  refresh() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.http.getWeather(this.city).subscribe((data) => {
      this.temperature = data.main.temp + 'º Celcius';
      this.descriptionArray = [];
      for (var weather of data.weather) {
        this.descriptionArray.push(weather.main);
      }
      this.description = this.descriptionArray.join(', ');
    })

    this.http.getCoordinates(this.city).subscribe((data) => {

      let lat = data.results[0].geometry.location.lat;
      let lng = data.results[0].geometry.location.lng;

      this.http.getCamera(lat, lng).subscribe((cameras) => {
        if (cameras.result.webcams.length > 0) {
          this.camera = cameras.result.webcams[0].player.live.available ? cameras.result.webcams[0].player.live.embed : cameras.result.webcams[0].player.day.embed;
          this.showCam = true;
        } else {
          this.camera = 'Camera not found in ' + this.city;
        }
        loading.dismiss();
      })
    })
  }

  getTrustedUrl(url) {
    console.log(url)
    return (url)

    //sanitizer.bypassSecurityTrustResourceUrl('https://api.lookr.com/embed/player/1508883064/day')
  }
  getItems(ev) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.cities.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
