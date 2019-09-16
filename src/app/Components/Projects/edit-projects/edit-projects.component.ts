import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../Services/Projects/project.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';
import { ClientsService } from '../../../Services/Clients/clients.service';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ModelsService } from 'src/app/Models/models';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.scss'],
})
export class EditProjectsComponent implements OnInit {

  project: any = {};
  showLoader: boolean = false;
  clients: Array<any> = [];
  constructor(
    public projectService: ProjectService,
    public alertCtrl: AlertController,
    private router: ActivatedRoute,
    public navCtrl: NavController,
    public clientService: ClientsService,
    public authService: AuthService,
    public modelService: ModelsService,
    public commonService: CommonService,
  ) {
    this.router.params.subscribe(params => {
      this.getProject(params['id']);
    });

  }

  ngOnInit() { }
  getProject(id) {
    this.projectService.getSingleProject(id).subscribe(snap => {
      this.project = snap.payload.data();
      if (this.project.archived) { this.project.archivedStatus = "Archived" } else { this.project.archivedStatus = "Not Archived"; }
      this.project.id = snap.payload.id;
      // if (this.project.client.length) {
      //   this.getClient(this.project.client);
      // }
      this.modelService.project.patchValue(this.project);
    })
  }


  updateProject() {
    this.authService.getCompany().then(comp => {
      this.modelService.project.patchValue({
        company: comp,
        user: firebase.auth().currentUser.uid,
        timestamp: moment().format()
      });
      let data = this.modelService.project.value;
      data.id = this.project.id;
      if (this.modelService.project.valid) {
        this.showLoader = true;
        this.projectService.updateProjects(data).then(newProj => {
          this.modelService.project.reset();
          this.navCtrl.navigateRoot(`/project-details/${this.project.id}`);
          this.showLoader = false;
          this.commonService.presentToast("Project updated");
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



  cancel() {
    console.log(this.project);
    if (this.project.archived) {
      this.navCtrl.navigateRoot('/archived-projects');
    } else {
      this.navCtrl.navigateRoot('/projects');
    }
  }



}
