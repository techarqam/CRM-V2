
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/Common/common.service';
import { UserService } from 'src/app/Services/Users/user.service';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ModelsService } from 'src/app/Models/models';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {

  userBtndis: boolean = false

  constructor(
    public commonService: CommonService,
    public navCtrl: NavController,
    public userService: UserService,
    public authService: AuthService,
    public modelService: ModelsService,
  ) {

  }

  ngOnInit() { }



  addUser() {
    this.authService.getCompany().then(comp => {
      this.modelService.user.patchValue({
        password: this.createPassword(),
        active: true,
        company: comp,
        isAdmin: false,
        status: "Unverified",
        addedBy: firebase.auth().currentUser.uid,
        timestamp: moment().format()
      });
      let data = this.modelService.user.value;
      if (this.modelService.user.valid) {
        this.userBtndis = true;
        this.userService.addUser(data)
        this.modelService.user.reset();
        this.userBtndis = false;
        this.gtUsers();
      } else {
        this.commonService.presentToast("Enter a valid email")
      }
    })
  }
  gtUsers() {
    this.navCtrl.navigateRoot("/all-users")
  }

  createPassword() {
    let length = 16;
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal: string = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

}
