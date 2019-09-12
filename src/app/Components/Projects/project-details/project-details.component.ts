import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../Services/Projects/project.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';
import { ClientsService } from '../../../Services/Clients/clients.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {

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
      this.getClient(this.project.client);
    })
  }

  async archive() {
    const alert = await this.alertCtrl.create({
      header: "Archive Project ?",
      message: 'You can find it in archived projects.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Archive',
          handler: data => {
            this.projectService.archiveProject(this.project.id).then(() => {
              this.navCtrl.navigateRoot('/archived-projects');
            })
          }
        }
      ]
    });
    return await alert.present();

  }
  async unarchive() {
    const alert = await this.alertCtrl.create({
      header: "Unarchive Project ?",
      message: 'It will be removed from Archived Projects.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Unarchive',
          handler: data => {
            this.projectService.unArchiveProject(this.project.id).then(() => {
              this.navCtrl.navigateRoot('/projects');
            })
          }
        }
      ]
    });
    return await alert.present();
  }
  async deleteProjectConfirm() {
    const alert = await this.alertCtrl.create({
      header: "Delete" + " " + this.project.name,
      message: 'This action cannot be reversed',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Project Name',
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
            if (data.name.toLowerCase() == this.project.name.toLowerCase()) {
              this.deleteProject();
            } else {
              this.commonService.presentToast("Project Name not Valid");
            }
            this.alertCtrl.dismiss();
          }
        }
      ]
    });
    return await alert.present();

  }
  deleteProject() {
    this.showLoader = true;
    this.projectService.delProjects(this.project.id).then(() => {
      this.commonService.presentToast("Project Deleted");
      this.showLoader = false;
      this.navCtrl.navigateRoot("/projects");
    })
  }
  gtFiles() {
    this.navCtrl.navigateForward(`/project-files/${this.project.id}`)
  }
  getClient(clientId) {
    this.clientService.getSingleClient(clientId).subscribe(snap => {
      this.client = snap.payload.data();
    })
  }
}
