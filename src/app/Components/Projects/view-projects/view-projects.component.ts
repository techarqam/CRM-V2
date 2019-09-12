import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProjectService } from '../../../Services/Projects/project.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.scss'],
})
export class ViewProjectsComponent implements OnInit {

  showLoader: boolean = false;
  projects: Array<any> = [];
  projectsLoaded: Array<any> = [];
  constructor(
    public projectService: ProjectService,
    public navCtrl: NavController,
  ) {
    this.getProjects();
  }

  ngOnInit() { }

  getProjects() {
    this.showLoader = true;
    this.projectService.getProjects().subscribe(snap => {
      let tempArray = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        temp.timestamp = moment(temp.timestamp).fromNow();
        tempArray.push(temp);
      })
      this.projects = tempArray;
      this.projectsLoaded = tempArray;
      this.showLoader = false;
    });
  }

  initializeItems(): void {
    this.projects = this.projectsLoaded;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q: string = searchbar;
    if (!q.length) {
      return;
    }
    this.projects = this.projects.filter((v) => {
      if ((v.name) && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  gtDetails(p) {
    this.navCtrl.navigateRoot(`/project-details/${p.id}`);
  }
  gtArchived() {
    this.navCtrl.navigateRoot('/archived-projects');
  }
}
