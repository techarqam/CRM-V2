import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../Services/Projects/project.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';
import { ClientsService } from '../../../Services/Clients/clients.service';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.scss'],
})
export class EditProjectsComponent implements OnInit {

  project: any = {};
  client: any = {};
  showLoader: boolean = false;
  constructor(
    public projectService: ProjectService,
    public alertCtrl: AlertController,
    private router: ActivatedRoute,
    public navCtrl: NavController,
    public clientService: ClientsService,
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
      if (this.project.client.length) {
        this.getClient(this.project.client);
      }
    })
  }
  getClient(clientId) {
    this.clientService.getSingleClient(clientId).subscribe(snap => {
      this.client = snap.payload.data();
    })
  }

}
