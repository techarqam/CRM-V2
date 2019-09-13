import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../Services/Clients/clients.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';
import { ProjectService } from '../../../Services/Projects/project.service';
import * as moment from 'moment';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent implements OnInit {

  client: any = {};
  showLoader: boolean = false;
  projects: Array<any> = [];
  constructor(
    public clientService: ClientsService,
    private router: ActivatedRoute,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public projectService: ProjectService,
    public commonService: CommonService,
  ) {
    this.router.params.subscribe(params => {
      this.getClient(params['id']);
      this.getProjects(params['id']);
    });
  }

  ngOnInit() { }

  getClient(id) {
    this.clientService.getSingleClient(id).subscribe(snap => {
      this.client = snap.payload.data();
      this.client.id = snap.payload.id;
    })
  }
  async deleteClientConfirm() {
    const alert = await this.alertCtrl.create({
      header: "Delete" + " " + this.client.name,
      message: 'This action cannot be reversed',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Client Name',
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
            if (data.name.toLowerCase() == this.client.name.toLowerCase()) {
              this.deleteClient();
            } else {
              this.commonService.presentToast("Client Name not Valid");
            }
            this.alertCtrl.dismiss();
          }
        }
      ]
    });
    return await alert.present();

  }
  deleteClient() {
    this.showLoader = true;
    this.clientService.delClients(this.client.id).then(() => {
      this.commonService.presentToast("Client Deleted");
      this.showLoader = false;
      this.navCtrl.navigateRoot("/clients");
    })
  }
  getProjects(clientId) {
    this.showLoader = true;
    this.clientService.getClientProjects(clientId).subscribe(snap => {
      let tempArray = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        temp.timestamp = moment(temp.timestamp).fromNow();
        tempArray.push(temp);
      })
      this.projects = tempArray;
      this.showLoader = false;
    });
  }
  gtDetails(p) {
    this.navCtrl.navigateRoot(`/project-details/${p.id}`);
  }

}
