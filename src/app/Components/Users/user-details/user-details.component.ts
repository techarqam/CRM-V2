import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/Users/user.service';
import { CommonService } from 'src/app/Services/Common/common.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: any = {};
  cUser: any = {};

  constructor(
    public alertCtrl: AlertController,
    private router: ActivatedRoute,
    public navCtrl: NavController,
    public authService: AuthService,
    public commonService: CommonService,
    public userService: UserService,
  ) {
    this.router.params.subscribe(params => {
      this.getCurrentUser();
      this.getUser(params['id']);
    });

  }

  ngOnInit() { }

  getCurrentUser() {
    this.authService.getUser().subscribe(snap => {
      this.cUser = snap.payload.data();
    })
  }

  getUser(userId) {
    this.userService.getSingleUser(userId).subscribe(snap => {
      let temp: any = snap.payload.data();
      temp.id = snap.payload.id;
      this.user = temp;
    })
  }

  async activate() {
    const alert = await this.alertCtrl.create({
      header: "Activate User ?",
      message: 'User will be able to access the portal',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Activate',
          handler: data => {
            this.userService.activateUser(this.user.id).then(() => {
              this.navCtrl.navigateRoot('/all-users').then(() => {
                this.commonService.presentToast(this.user.name + " is now activated")
              })
            })
          }
        }
      ]
    });
    return await alert.present();

  }
  async deactivate() {
    const alert = await this.alertCtrl.create({
      header: "Deactivate User?",
      message: 'User will not be able to access the portal.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Deactivate',
          handler: data => {
            this.userService.deactivateUser(this.user.id).then(() => {
              this.navCtrl.navigateRoot('/all-users').then(() => {
                this.commonService.presentToast(this.user.name + " is now deactivated")
              })
            })
          }
        }
      ]
    });
    return await alert.present();
  }

  async deleteUserConfirm() {
    const alert = await this.alertCtrl.create({
      header: "Delete" + " " + this.user.name,
      message: 'This action cannot be reversed',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: "User's Name",
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Delete',
          handler: data => {
            if (data.name.toLowerCase() == this.user.name.toLowerCase()) {
              this.deleteUser();
            } else {
              this.commonService.presentToast("User's Name not Valid");
            }
            this.alertCtrl.dismiss();
          }
        }
      ]
    });
    return await alert.present();

  }
  deleteUser() {
    this.userService.delUser(this.user.id);
    this.commonService.presentToast("User Deleted");
    this.navCtrl.navigateRoot("/all-users");
  }



}

