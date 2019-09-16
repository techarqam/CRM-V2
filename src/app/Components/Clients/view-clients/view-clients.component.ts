import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../Services/Projects/project.service';
import { NavController } from '@ionic/angular';
import { ClientsService } from '../../../Services/Clients/clients.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss'],
})
export class ViewClientsComponent implements OnInit {

  showLoader: boolean = false;
  clients: Array<any> = [];
  clientsLoaded: Array<any> = [];
  isGrid: boolean = true;
  constructor(
    public clientService: ClientsService,
    public authService: AuthService,
    public navCtrl: NavController,
  ) {
    this.getClients();
  }

  ngOnInit() { }
  getClients() {
    this.showLoader = true;
    this.authService.getCompany().then(comp => {
      this.clientService.getClients(comp).subscribe(snap => {
        let tempArray = [];
        snap.forEach(snip => {
          let temp: any = snip.payload.doc.data();
          temp.id = snip.payload.doc.id;
          temp.timestamp = moment(temp.timestamp).fromNow();
          tempArray.push(temp);
        })
        console.log(tempArray);
        this.clients = tempArray;
        this.clientsLoaded = tempArray;
        this.showLoader = false;
      });
    });
  }


  initializeItems(): void {
    this.clients = this.clientsLoaded;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q: string = searchbar;
    if (!q.length) {
      return;
    }
    this.clients = this.clients.filter((v) => {
      if ((v.name) && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  gtDetails(c) {
    this.navCtrl.navigateRoot(`/client-details/${c.id}`);
  }
  callClient(c) {
    window.location.href = 'tel:' + c.phone;
  }
  whatsappClient(c) {
    // window.location.href = "whatsapp//send?phone=" + c.phone;
  }
}
