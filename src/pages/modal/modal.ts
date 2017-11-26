import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  cities = ['Lisbon', 'London', 'Barcelona'];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  itemSelected(city){
    this.viewCtrl.dismiss(city)
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
