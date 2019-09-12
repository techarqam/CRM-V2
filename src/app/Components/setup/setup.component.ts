import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { ModelsService } from 'src/app/Models/models';
import { CommonService } from 'src/app/Services/Common/common.service';
import { ProjectService } from 'src/app/Services/Projects/project.service';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { ClientsService } from 'src/app/Services/Clients/clients.service';
import { UserService } from 'src/app/Services/Users/user.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {

  @ViewChild(IonSlides, { static: true }) slides: IonSlides;


  projBtndis: boolean = false
  clientBtndis: boolean = false
  userBtndis: boolean = false



  constructor(
    public modelService: ModelsService,
    public navCtrl: NavController,
    public commonService: CommonService,
    public projectService: ProjectService,
    public clientService: ClientsService,
    public userService: UserService,
  ) { }

  ngOnInit() {

    this.slides.lockSwipes(true);
  }



  addProject() {
    let data = this.modelService.project.value;
    this.modelService.project.patchValue({
      archived: false,
      user: firebase.auth().currentUser.uid,
      timestamp: moment().format()
    });
    if (this.modelService.project.valid) {
      this.projBtndis = true;
      this.projectService.addProject(data).then(newProj => {
        this.modelService.project.reset();
        this.projBtndis = false;
        this.gtSecond();
      })
    } else {
      this.commonService.presentToast("Enter a valid name")
    }

  }

  addClient() {
    let data = this.modelService.client.value;
    this.modelService.client.patchValue({
      user: firebase.auth().currentUser.uid,
      timestamp: moment().format()
    });
    if (this.modelService.client.valid) {
      this.clientBtndis = true;
      this.clientService.addClient(data).then(newProj => {
        this.modelService.client.reset();
        this.clientBtndis = false;
        this.gtSecond();
      })
    } else {
      this.commonService.presentToast("Enter a valid name")
    }

  }

  addUser() {
    this.modelService.user.patchValue({
      isAdmin: false,
      status: "Unverified",
      addedBy: firebase.auth().currentUser.uid,
      timestamp: moment().format()
    });
    let data = this.modelService.user.value;
    if (this.modelService.user.valid) {
      this.userBtndis = true;
      this.userService.addUser(data)
      this.modelService.user.reset();
      this.userBtndis = false;
      this.gtDashboard();
    } else {
      this.commonService.presentToast("Enter a valid email")
    }
  }


  gtDashboard() {
    this.navCtrl.navigateRoot("/dashboard")
  }






  gtSecond() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);

  }
  gtFirst() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

}
