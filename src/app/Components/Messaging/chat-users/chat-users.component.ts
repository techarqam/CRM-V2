import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/Services/Common/common.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { UserService } from 'src/app/Services/Users/user.service';
import { MessagingService } from 'src/app/Services/Messaging/messaging.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss'],
})
export class ChatUsersComponent implements OnInit {

  @Input() selUser: string;



  showLoader: boolean = false;
  users: Array<any> = [];
  usersLoaded: Array<any> = [];
  cUser: any = {};

  activatedUser: any = {};

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public commonService: CommonService,
    public navCtrl: NavController,
    public messagingService: MessagingService,
  ) {
    this.getCurrentUser();
    this.getUsers();
    console.log(this.selUser);
  }

  ngOnInit() {
    this.messagingService.currentUser.subscribe(message => this.activatedUser = message);
  }



  getCurrentUser() {
    this.authService.getUser().subscribe(snap => {
      let temp: any = snap.payload.data();
      temp.id = snap.payload.id;
      this.cUser = temp;
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
            if (temp.id != this.cUser.id) {
              tempArray.push(temp);
            }
          }
        })
        this.users = tempArray;
        this.usersLoaded = tempArray;
        this.activateUser(this.users[0]);
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

  activateUser(user: any) {
    this.messagingService.getActivatedUser(user);
    // this.messagingService.getUserMessages()
  }

}
