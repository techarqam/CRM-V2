import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { EmailService } from '../../../Services/email/email.service';
@Component({
  selector: 'view-add-email',
  templateUrl: './view-email.component.html',
  styleUrls: ['./view-email.component.scss'],
})
export class ViewEmailComponent implements OnInit {
  showLoader: boolean = false;
  email: Array<any> = [];
  emailLoaded: Array<any> = [];
  isGrid: boolean = false;
  constructor(
    public emailService: EmailService,
    public navCtrl: NavController,
  ) {
    this.getemails();
  }

  ngOnInit() { }
  getemails() {
    this.showLoader = true;
    this.emailService.getEmails().subscribe(snap => {
      let tempArray = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        temp.timestamp = moment(temp.timestamp).fromNow();
        tempArray.push(temp);
      })
      this.email = tempArray;
      this.emailLoaded = tempArray;
      this.showLoader = false;
    });
  }


  initializeItems(): void {
    this.email = this.emailLoaded;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q: string = searchbar;
    if (!q.length) {
      return;
    }
    this.email = this.email.filter((v) => {
      if ((v.name) && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  gtDetails(p) {
    let x = '/email-details/' + p.id;
    this.navCtrl.navigateRoot(x);
  }


}