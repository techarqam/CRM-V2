import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { UserService } from 'src/app/Services/Users/user.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';

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
  constructor(
    public userService: UserService,
    public authService: AuthService,
    public navCtrl: NavController,
  ) {
    this.getUsers();
  }

  ngOnInit() { }
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

}
