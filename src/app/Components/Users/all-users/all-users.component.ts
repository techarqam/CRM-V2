import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { UserService } from 'src/app/Services/Users/user.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CommonService } from 'src/app/Services/Common/common.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent implements OnInit {

  showLoader: boolean = false;
  users: Array<any> = [];
  usersLoaded: Array<any> = [];
  isGrid: boolean = true;
  cUser: any = {};
  constructor(
    public userService: UserService,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public commonService: CommonService,
    public navCtrl: NavController,
  ) {
    this.getCurrentUser();
    this.getUsers();
  }

  ngOnInit() { }

  getCurrentUser() {
    this.authService.getUser().subscribe(snap => {
      this.cUser = snap.payload.data();
    })
  }

  getUsers() {
    this.showLoader = true;
    this.authService.getCompany().then(comp => {
      this.userService.getUsers(comp).subscribe(snap => {
        let tempArray = [];
        snap.forEach(snip => {
          let temp: any = snip.payload.doc.data();
          temp.id = snip.payload.doc.id;
          if (temp.active) { temp.activeStatus = "Active" } else { temp.activeStatus = "Disabled" }
          tempArray.push(temp);
        })
        this.users = tempArray;
        this.usersLoaded = tempArray;
        this.showLoader = false;
      });
    })
  }


  initializeItems(): void {
    this.users = this.usersLoaded;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q: string = searchbar;
    if (!q.length) {
      return;
    }
    this.users = this.users.filter((v) => {
      if ((v.name) && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  gtUserDetails(u) {
    this.navCtrl.navigateRoot(`/user/${u.id}`)
  }


  chat(p) {
    console.log(p)
  }

  async activate(u) {
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
            this.userService.activateUser(u.id).then(() => {
              this.navCtrl.navigateRoot('/all-users').then(() => {
                this.commonService.presentToast(u.name + " is now activated")
              })
            })
          }
        }
      ]
    });
    return await alert.present();

  }
  async deactivate(u) {
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
            this.userService.deactivateUser(u.id).then(() => {
              this.navCtrl.navigateRoot('/all-users').then(() => {
                this.commonService.presentToast(u.name + " is now Deactivated")
              })
            })
          }
        }
      ]
    });
    return await alert.present();
  }


}
