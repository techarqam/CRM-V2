import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/Services/Messaging/messaging.service';
import { AlertController } from '@ionic/angular';
import { ModelsService } from 'src/app/Models/models';
import { CommonService } from 'src/app/Services/Common/common.service';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  activatedUser: any = {};


  user: any = {};
  showLoader: boolean = false;
  messages: Array<any> = [];
  sentMessages: Array<any> = [];
  recievedMessages: Array<any> = [];


  constructor(
    public messagingService: MessagingService,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public modelService: ModelsService,
    public commonService: CommonService,
  ) { }

  ngOnInit() {
    this.messagingService.currentUser.subscribe(message => this.activatedUser = message);
  }
  getUser(id) {
    this.messagingService.getSingleUser(id).subscribe(snap => {
      this.user = snap.payload.data();
      this.user.id = snap.payload.id;
      this.getSentMessages(this.user.id);
      // this.getRecievedMessages(this.user.id);
    })
  }

  getSentMessages(recieverId) {
    this.showLoader = true;
    this.messages = [];
    this.messagingService.getSentMessages(recieverId).subscribe(snap => {
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        temp.type = "sent";
        temp.slotPlace = "end";
        temp.timestampDisplay = moment(temp.timestamp).fromNow();
        this.messages.push(temp);
      })
    })
    this.messagingService.getRecivedMessages(recieverId).subscribe(snap => {
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        temp.type = "recieved";
        temp.slotPlace = "start";
        temp.timestampDisplay = moment(temp.timestamp).fromNow();
        this.messages.push(temp);
      })
    })
    //Sorting problem
    this.sortMessages();
    this.showLoader = false;
  }

  sendMessage() {
    this.authService.getCompany().then(comp => {
      this.modelService.message.patchValue({
        company: comp,
        reciever: this.activatedUser.id,
        sender: firebase.auth().currentUser.uid,
        timestamp: moment().format()
      });
      let data = this.modelService.message.value;
      // console.log(data)
      if (data.message.length) {
        this.messagingService.sendMessage(data)
          .then(() => {
            this.modelService.message.reset();
          })
      }
    });
  }

  sortMessages() {
    console.log('messages 1 :', this.messages)
    this.messages.sort((val1, val2) => {
      let x: any = new Date(val1.timestamp);
      let y: any = new Date(val2.timestamp);
      return x - y
    })
    console.log('messages 2 :', this.messages)
  }

}
