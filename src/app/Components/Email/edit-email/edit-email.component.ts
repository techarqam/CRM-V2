import { Component, OnInit } from '@angular/core';
        import * as moment from 'moment';
        import { NavController } from '@ionic/angular';
        import { ActivatedRoute } from '@angular/router';
        import { ModelsService } from '../../../Models/models';
        import { CommonService } from '../../../Services/Common/common.service';
        import { EmailService } from '../../../Services/email/email.service';

        @Component({
        selector: 'edit-add-email',
        templateUrl: './edit-email.component.html',
        styleUrls: ['./edit-email.component.scss'],
        })
        export class EditEmailComponent implements OnInit {
          disableBtn: boolean = false;
          email : any = {};
          constructor(
            public modelService: ModelsService,
            public commonService: CommonService,
            private router: ActivatedRoute,
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
            this.modelService.email.patchValue(this.email)
          })      
        }
        updateEmail() {
          this.modelService.email.patchValue({
            timestamp: moment().format()
          });
          let data = this.modelService.email.value;
          if (this.modelService.email.valid) {
            this.disableBtn = true;
            this.emailService.updateEmails(data,this.email.id).then(() => {
              this.modelService.email.reset();
              this.navCtrl.navigateRoot('/view-email');
              this.disableBtn = false;
              this.commonService.presentToast("Email added");
            })
          } else {
            this.commonService.presentToast("Email not valid")
          }          
      }
    }
    