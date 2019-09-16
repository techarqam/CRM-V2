import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/Services/Common/common.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { UserService } from 'src/app/Services/Users/user.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss'],
})
export class ChatUsersComponent implements OnInit {

  showLoader: boolean = false;
  users: Array<any> = [];
  usersLoaded: Array<any> = [];
  cUser: any = {};

  constructor(
    public userService: UserService,
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
          if (temp.active) {
            tempArray.push(temp);
          }
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



}
