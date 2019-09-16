import { Component, OnInit } from '@angular/core';
        import * as moment from 'moment';
        import { AlertController, NavController } from '@ionic/angular';
        import { ActivatedRoute } from '@angular/router';
        import { ModelsService } from '../../../Models/models';
        import { CommonService } from '../../../Services/Common/common.service';
        import { EmailService } from '../../../Services/email/email.service';

        @Component({
        selector: 'details-add-email',
        templateUrl: './details-email.component.html',
        styleUrls: ['./details-email.component.scss'],
        })
        export class DetailsEmailComponent implements OnInit {
          email: any = {};
          showLoader: boolean = false;
          constructor(
            public modelService: ModelsService,
            public alertCtrl: AlertController,
            private router: ActivatedRoute,
            public commonService: CommonService,
            public emailService: EmailService,
            public navCtrl: NavController,
          ) { 
          this.router.params.subscribe(params => {
            this.getEmail(params['id']);
          });      
        }
        ngOnInit() { }
        getEmail(id){
          this.emailService.getSingleEmail(id).subscribe(snap => {
            this.email = snap.payload.data();
            this.email.id = snap.payload.id;
          })      
        }

        async deleteEmailConfirm() {
          const alert = await this.alertCtrl.create({
            header: "Delete" + " " + this.email.name,
            message: 'This action cannot be reversed',
            inputs: [
              {
                name: 'name',
                type: 'text',
                placeholder: 'Email Name',
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
                  if (data.name.toLowerCase() == this.email.name.toLowerCase()) {
                    this.deleteEmail();
                  } else {
                    this.commonService.presentToast("Email Name not Valid");
                  }
                  this.alertCtrl.dismiss();
                }
              }
            ]
          });
          return await alert.present();
       }
      
       deleteEmail() {
        this.showLoader = true;
        this.emailService.delEmails(this.email.id).then(() => {
          this.commonService.presentToast("Email Deleted");
          this.showLoader = false;
          this.navCtrl.navigateRoot("/view-email");
        })
      }
      editEmail() {
        let x = '/edit-email/' + this.email.id;
        this.navCtrl.navigateRoot(x);
      }
      }
      