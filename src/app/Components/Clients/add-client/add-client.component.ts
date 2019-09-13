import { Component, OnInit } from '@angular/core';
import { ModelsService } from '../../../Models/models';
import { CommonService } from '../../../Services/Common/common.service';
import { ClientsService } from '../../../Services/Clients/clients.service';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {

  showLoader: boolean = false;
  constructor(
    public modelService: ModelsService,
    public commonService: CommonService,
    public clientService: ClientsService,
    public navCtrl: NavController,
  ) {
  }

  ngOnInit() { }
  addClient() {
    let data = this.modelService.client.value;
    if (this.modelService.client.valid) {
      this.showLoader = true;
      this.clientService.addClient(data).then(() => {
        this.modelService.client.reset();
        this.modelService.project.patchValue({
          user: firebase.auth().currentUser.uid,
          timestamp: moment().format()
        });
        this.navCtrl.navigateRoot('/clients');
        this.showLoader = false;
        this.commonService.presentToast("Client added");
      })
    } else {
      this.commonService.presentToast("Client not valid")
    }
  }
}
