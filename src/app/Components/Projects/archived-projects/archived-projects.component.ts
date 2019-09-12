import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../Services/Projects/project.service';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-archived-projects',
  templateUrl: './archived-projects.component.html',
  styleUrls: ['./archived-projects.component.scss'],
})
export class ArchivedProjectsComponent implements OnInit {

  showLoader: boolean = false;
  projects: Array<any> = [];
  constructor(
    public projectService: ProjectService,
    public navCtrl: NavController,
  ) {
    this.getProjects();
  }

  ngOnInit() { }

  getProjects() {
    this.showLoader = true;
    this.projectService.getArchivedProjects().subscribe(snap => {
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
