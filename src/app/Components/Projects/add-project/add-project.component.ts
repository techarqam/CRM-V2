import { Component, OnInit } from '@angular/core';
import { ModelsService } from '../../../Models/models';
import { CommonService } from '../../../Services/Common/common.service';
import { ProjectService } from '../../../Services/Projects/project.service';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { ClientsService } from '../../../Services/Clients/clients.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {

  showLoader: boolean = false;
  clients: Array<any> = [];
  constructor(
    public modelService: ModelsService,
    public commonService: CommonService,
    public projectService: ProjectService,
    public navCtrl: NavController,
    public authService: AuthService,
    public clientService: ClientsService,
  ) {
    this.getClients();
  }

  ngOnInit() { }
  addProject() {
    this.authService.getCompany().then(comp => {
      this.modelService.project.patchValue({
        company: comp,
        archived: false,
        user: firebase.auth().currentUser.uid,
        timestamp: moment().format()
      });
      let data = this.modelService.project.value;
      if (this.modelService.project.valid) {
        this.showLoader = true;
        this.projectService.addProject(data).then(newProj => {
          this.modelService.project.reset();
          this.navCtrl.navigateRoot(`/project-details/${newProj}`);
          this.showLoader = false;
          this.commonService.presentToast("Project added");
        })
      } else {
        this.commonService.presentToast("Project not valid")
      }
    })

  }

  getClients() {
    this.authService.getCompany().then(comp => {
      this.clientService.getClients(comp).subscribe(snap => {
        let tempArray = [];
        snap.forEach(snip => {
          let temp: any = snip.payload.doc.data();
          temp.id = snip.payload.doc.id;
          temp.timestamp = moment(temp.timestamp).fromNow();
          tempArray.push(temp);
        })
        this.clients = tempArray;
      });
    });
  }
}
