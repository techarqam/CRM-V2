import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/Home/home.service';
import * as moment from 'moment';
import { CommonService } from 'src/app/Services/Common/common.service';
import { NavController } from '@ionic/angular';
import { ModelsService } from 'src/app/Models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  disableBtn: boolean = false;
  constructor(
    public homeService: HomeService,
    public commonService: CommonService,
    public navCtrl: NavController,
    public modelService: ModelsService
  ) { }

  ngOnInit() { }

  signUp() {

    let data = this.modelService.signUp.value;

    if (this.modelService.signUp.valid) {
      this.disableBtn = true;
      this.homeService.signUpCompany(data).then(() => {

        this.modelService.signUp.reset();


        this.modelService.signUp.patchValue({
          // isAdmin: false,
          // status: "Unverified",
          terms: false,
        });
        this.navCtrl.navigateRoot(`/setup`);
        this.disableBtn = false;
      }).catch(err => {
        this.commonService.presentToast(err);
      })
    } else {
      this.commonService.presentToast("signUp not valid")
    }
  }



}
