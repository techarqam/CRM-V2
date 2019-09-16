import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/Common/common.service';
import { NavController } from '@ionic/angular';
import { ClientsService } from 'src/app/Services/Clients/clients.service';
import { ActivatedRoute } from '@angular/router';
import { ModelsService } from 'src/app/Models/models';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import * as moment from 'moment';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.scss'],
})
export class EditClientsComponent implements OnInit {

  client: any = {};
  showLoader: boolean = false;
  constructor(
    private router: ActivatedRoute,
    public clientService: ClientsService,
    public modelService: ModelsService,
    public navCtrl: NavController,
    public commonService: CommonService,
    public authService: AuthService,
  ) {
    this.router.params.subscribe(params => {
      this.getClient(params['id']);
    });
  }

  ngOnInit() { }
  getClient(id) {
    this.clientService.getSingleClient(id).subscribe(snap => {
      this.client = snap.payload.data();
      this.client.id = snap.payload.id;
      this.modelService.client.patchValue(this.client);
    })
  }


  updateClient() {
    this.authService.getCompany().then(comp => {
      this.modelService.client.patchValue({
        company: comp,
        user: firebase.auth().currentUser.uid,
        timestamp: moment().format()
      });
      let data = this.modelService.client.value;
      if (this.modelService.client.valid) {
        this.showLoader = true;
        data.id = this.client.id;
        this.clientService.updateClients(data).then(() => {
          this.modelService.client.reset();
          this.navCtrl.navigateRoot('/clients');
          this.showLoader = false;
          this.commonService.presentToast(this.client.name + " updated");
        })
      } else {
        this.commonService.presentToast("Client not valid")
      }
    })
  }

  cancel() {
    this.navCtrl.navigateRoot('/clients');
  }

}
