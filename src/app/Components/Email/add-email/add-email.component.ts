import { Component, OnInit } from '@angular/core';
        import * as moment from 'moment';
        import { NavController } from '@ionic/angular';
        import { ModelsService } from '../../../Models/models';
        import { CommonService } from '../../../Services/Common/common.service';
        import { EmailService } from '../../../Services/email/email.service';

        @Component({
        selector: 'add-add-email',
        templateUrl: './add-email.component.html',
        styleUrls: ['./add-email.component.scss'],
        })
        export class AddEmailComponent implements OnInit {
            disableBtn: boolean = false;
            constructor(
                public modelService: ModelsService,
                public commonService: CommonService,
                public emailService: EmailService,
                public navCtrl: NavController,
            ) { }
            ngOnInit() { }
            
            addEmail() {
                  this.modelService.email.patchValue({
                    timestamp: moment().format()
                  });
                  let data = this.modelService.email.value;
                  if (this.modelService.email.valid) {
                    this.disableBtn = true;
                    this.emailService.addEmail(data).then(() => {
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
            