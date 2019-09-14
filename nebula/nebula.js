let modules = process.argv;
modules.splice(0, 3);

var fs = require('fs');
var mkdirp = require('mkdirp');
var componentUrl = "src/app/Components/";
var serviceUrl = "src/app/Services/";


var routingUrl = "src/app/";
var modelUrl = "src/app/Models/";
var appModuleUrl = "src/app/";


createRouting();
createComponents();
createModels();
createAppModule();



function createAppModule() {
  let imps = '';

  modules.forEach(module => {
    var routingMid = `import {Add${caps(module)}Component } from './Components/${caps(module)}/add-${module}/add-${module}.component';
import {Edit${caps(module)}Component } from './Components/${caps(module)}/edit-${module}/edit-${module}.component';
import {Details${caps(module)}Component } from './Components/${caps(module)}/details-${module}/details-${module}.component';
import {View${caps(module)}Component } from './Components/${caps(module)}/view-${module}/view-${module}.component';
`;
    imps = imps + routingMid;
  });
  // console.log(imps);
  imps = imps + `
  @NgModule({
  `
  let decs = '';
  modules.forEach(module => {
    var routingMid = `
    /*${caps(module)}*/
    Add${caps(module)}Component,
    Edit${caps(module)}Component,
    Details${caps(module)}Component,
    View${caps(module)}Component,
    `;
    decs = decs + routingMid;
  })
  // console.log(decs);
  decs = `AppComponent,` + decs;
  fs.readFile(appModuleUrl + "/" + 'app.module.ts', 'utf8', function (err, data) {
    var result = data.replace(
      `@NgModule({`,
      imps);
    result = result.replace(
      `AppComponent,`,
      decs);
    createFile(appModuleUrl, `app.module`, "ts", result);
  })
}
function createComponents() {
  modules.forEach(module => {
    createModule(module)
  })
}
function createRouting() {
  let imps = '';
  modules.forEach(module => {
    var routingMid = `
  /*${caps(module)}*/
  import {Add${caps(module)}Component } from './Components/${caps(module)}/add-${module}/add-${module}.component';
  import {Edit${caps(module)}Component } from './Components/${caps(module)}/edit-${module}/edit-${module}.component';
  import {Details${caps(module)}Component } from './Components/${caps(module)}/details-${module}/details-${module}.component';
  import {View${caps(module)}Component } from './Components/${caps(module)}/view-${module}/view-${module}.component';`;
    imps = imps + routingMid;
  });
  imps = imps + `
    const routes: Routes = [
    `
  let decs = '';
  modules.forEach(module => {
    var routingMid = `
    /*Module ${caps(module)}*/
    {
        path: 'view-${module}',
        component: View${caps(module)}Component,
        canActivate: [AuthGuard]
    },
    {
        path: 'add-${module}',
        component: Add${caps(module)}Component,
        canActivate: [AuthGuard]
    },
    {
        path: 'edit-${module}/:id',
        component: Edit${caps(module)}Component,
        canActivate: [AuthGuard]
    },
    {
        path: '${module}-details/:id',
        component: Details${caps(module)}Component,
        canActivate: [AuthGuard]
    },
    `
    decs = decs + routingMid;
  })
  fs.readFile(routingUrl + "/" + 'app-routing.module.ts', 'utf8', function (err, data) {
    var result = data.replace(
      `const routes: Routes = [`,
      imps + decs);
    createFile(routingUrl, `app-routing.module`, "ts", result);
  })
}
function createModels() {
  var modelContent = ``;
  modules.forEach(module => {
    var modelMid = `   
        /*${caps(module)}*/ 
        ${module} = new FormGroup({
            name: new FormControl("", Validators.compose([
                Validators.required,
                Validators.minLength(6)
            ])),
            timestamp: new FormControl(moment().format(),Validators.required)
        });
    `;
    modelContent = modelContent + modelMid;
  })
  modelContent = `export class ModelsService {
  `+ modelContent;
  fs.readFile(modelUrl + "/" + 'models.ts', 'utf8', function (err, data) {
    var result = data.replace(
      `export class ModelsService {`,
      modelContent);
    createFile(modelUrl, `models`, "ts", result);
  })
}
function createModule(module) {
  let cUrl = componentUrl + caps(module);
  let sUrl = serviceUrl + caps(module);
  createComponent(cUrl, module, "view");
  createComponent(cUrl, module, "add");
  createComponent(cUrl, module, "edit");
  createComponent(cUrl, module, "details");
  createService(sUrl, module);
  console.log(`Created ${caps(module)}`);
}
function createService(url, module) {
  var servicespecTs = `import { TestBed } from '@angular/core/testing';
    import { ${caps(module)}Service } from './${module}.service';
    describe('${caps(module)}Service', () => {
      beforeEach(() => TestBed.configureTestingModule({}));
      it('should be created', () => {
        const service: ${caps(module)}Service = TestBed.get(${caps(module)}Service);
        expect(service).toBeTruthy();
      });
    });`;
  serviceTs = `import { Injectable } from '@angular/core';
    import { AngularFirestore } from '@angular/fire/firestore';
    @Injectable({
      providedIn: 'root'
    })
    export class ${caps(module)}Service {
      dbRef = this.db.collection('${ caps(module)} ', ref => ref.orderBy('timestamp', 'desc'));
      constructor(
        public db: AngularFirestore,
      ) { }
      add${caps(module)}(${module}) {
        return this.dbRef.add(${module});
      }
      get${caps(module)}s() {
        return this.dbRef.snapshotChanges();
      }
      getSingle${caps(module)}(${module}Id) {
        return this.dbRef.doc(${module}Id).snapshotChanges();
      }
      update${caps(module)}s(${module}, ${module}Id) {
        return this.dbRef.doc(${module}Id).update(${module});
      }
      del${caps(module)}s(${module}Id) {
        return this.dbRef.doc(${module}Id).delete();
      }
      }
    `;
  createFolder(url);
  createFile(url, `${module}.service`, "spec.ts", servicespecTs);
  createFile(url, `${module}.service`, "ts", serviceTs);
}
function createComponent(url, module, type) {

  url = url + "/" + type + "-" + module;
  createFolder(url);

  data = {
    html: ``,
    sass: ``,
    spects: ``,
    ts: ``
  }
  data.spects = `import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
    import { async, ComponentFixture, TestBed } from '@angular/core/testing';
    
    import { ${caps(type)}${caps(module)}Component } from './${type}-${module}.component';
    
    describe('${caps(type)}${caps(module)}Component', () => {
      let component: ${caps(type)}${caps(module)}Component;
      let fixture: ComponentFixture<${caps(type)}${caps(module)}Component>;
    
      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ ${caps(type)}${caps(module)}Component ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
      }));
    
      beforeEach(() => {
        fixture = TestBed.createComponent(${caps(type)}${caps(module)}Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    
      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
    `;

  if (type == "add") {
    data.html = `<app-main-header></app-main-header>
        <ion-content>
    <ion-grid>
        <ion-row>
            <ion-col size="12" size-md="4" offset-md="4">
                <ion-card>

                    <ion-card-header>
                        <ion-title class="card-header">Add a ${caps(module)}</ion-title>
                    </ion-card-header>
                    <ion-row>
                        <ion-col size="12" size-md="10" offset-md="1">
                            <ion-card-content>
                            <form [formGroup]="this.modelService.${module}">

                            <ion-item>
                            <ion-label position="floating">Name</ion-label>
                            <ion-input type="text" formControlName="name"></ion-input>
                          </ion-item>
        
                          <ion-button expand="full" class="ion-margin-top" [disabled]="disableBtn" (click)="add${caps(module)}()">
                          Create ${caps(module)}
                          </ion-button>
                            </form>
                            </ion-card-content>
                        </ion-col>
                    </ion-row>

                </ion-card>
            </ion-col>
        </ion-row>
    </ion-grid>
</ion-content>
`;
    data.sass = `.card-header {font-size: 24px;font-weight: 700;color: #242628;line-height: 30px;padding-top: 50px;text-align: center;}`;
    data.ts = `import { Component, OnInit } from '@angular/core';
        import * as moment from 'moment';
        import { NavController } from '@ionic/angular';
        import { ModelsService } from '../../../Models/models';
        import { CommonService } from '../../../Services/Common/common.service';
        import { ${caps(module)}Service } from '../../../Services/${module}/${module}.service';

        @Component({
        selector: '${type}-add-${module}',
        templateUrl: './${type}-${module}.component.html',
        styleUrls: ['./${type}-${module}.component.scss'],
        })
        export class ${caps(type)}${caps(module)}Component implements OnInit {
            disableBtn: boolean = false;
            constructor(
                public modelService: ModelsService,
                public commonService: CommonService,
                public ${module}Service: ${caps(module)}Service,
                public navCtrl: NavController,
            ) { }
            ngOnInit() { }
            
            add${caps(module)}() {
                  this.modelService.${module}.patchValue({
                    timestamp: moment().format()
                  });
                  let data = this.modelService.${module}.value;
                  if (this.modelService.${module}.valid) {
                    this.disableBtn = true;
                    this.${module}Service.add${caps(module)}(data).then(() => {
                      this.modelService.${module}.reset();
                      this.navCtrl.navigateRoot('/view-${module}');
                      this.disableBtn = false;
                      this.commonService.presentToast("${caps(module)} added");
                    })
                  } else {
                    this.commonService.presentToast("${caps(module)} not valid")
                  }          
              }
            }
            `;
  }
  if (type == "edit") {
    data.html = `<app-main-header></app-main-header>
    <ion-content>
    <ion-grid>
        <ion-row>
            <ion-col size="12" size-md="4" offset-md="4">
                <ion-card>

                    <ion-card-header>
                        <ion-title class="card-header">Add a ${caps(module)}</ion-title>
                    </ion-card-header>
                    <ion-row>
                        <ion-col size="12" size-md="10" offset-md="1">
                            <ion-card-content>
                            <form [formGroup]="this.modelService.${module}">

                            <ion-item>
                            <ion-label position="floating">Name</ion-label>
                            <ion-input type="text" formControlName="name"></ion-input>
                          </ion-item>
        
                          <ion-button expand="full" class="ion-margin-top" [disabled]="disableBtn" (click)="update${caps(module)}()">
                          Update ${caps(module)}
                          </ion-button>
                            </form>
                            </ion-card-content>
                        </ion-col>
                    </ion-row>

                </ion-card>
            </ion-col>
        </ion-row>
    </ion-grid>
</ion-content>
    `;
    data.ts = `import { Component, OnInit } from '@angular/core';
        import * as moment from 'moment';
        import { NavController } from '@ionic/angular';
        import { ActivatedRoute } from '@angular/router';
        import { ModelsService } from '../../../Models/models';
        import { CommonService } from '../../../Services/Common/common.service';
        import { ${caps(module)}Service } from '../../../Services/${module}/${module}.service';

        @Component({
        selector: '${type}-add-${module}',
        templateUrl: './${type}-${module}.component.html',
        styleUrls: ['./${type}-${module}.component.scss'],
        })
        export class ${caps(type)}${caps(module)}Component implements OnInit {
          disableBtn: boolean = false;
          ${module} : any = {};
          constructor(
            public modelService: ModelsService,
            public commonService: CommonService,
            private router: ActivatedRoute,
            public ${module}Service: ${caps(module)}Service,
            public navCtrl: NavController,
        ) { 
          this.router.params.subscribe(params => {
            this.get${caps(module)}(params['id']);
          });      
        }
        ngOnInit() { }
        get${caps(module)}(id){
          this.${module}Service.getSingle${caps(module)}(id).subscribe(snap => {
            this.${module} = snap.payload.data();
            this.${module}.id = snap.payload.id;
            this.modelService.${module}.patchValue(this.${module})
          })      
        }
        update${caps(module)}() {
          this.modelService.${module}.patchValue({
            timestamp: moment().format()
          });
          let data = this.modelService.${module}.value;
          if (this.modelService.${module}.valid) {
            this.disableBtn = true;
            this.${module}Service.update${caps(module)}s(data,this.${module}.id).then(() => {
              this.modelService.${module}.reset();
              this.navCtrl.navigateRoot('/view-${module}');
              this.disableBtn = false;
              this.commonService.presentToast("${caps(module)} added");
            })
          } else {
            this.commonService.presentToast("${caps(module)} not valid")
          }          
      }
    }
    `;
  }
  if (type == "details") {
    data.html = `<app-main-header></app-main-header>
    <ion-content>
    <ion-grid>
        <ion-row>
            <ion-col size="12" size-md="9">
                <app-loader *ngIf="showLoader"></app-loader>
                <ion-card [hidden]="showLoader">
                    <ion-card-header>
                        <ion-card-title class="pageTitle">
                            {{${module}.name}}
                            <ion-icon name="create" size="small" (click)="edit${caps(module)}()" color="primary"
                                class="ion-margin-start" style="cursor : pointer;">
                            </ion-icon>
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>

                    </ion-card-content>
                </ion-card>
            </ion-col>
            <ion-col size="12" size-md="3">
                <ion-button expand="block" fill="clear" color="danger" (click)="delete${caps(module)}Confirm()">
                    <ion-icon class="ion-margin-end" name="trash"></ion-icon>
                    Delete ${caps(module)}
                </ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
</ion-content>
    `;
    data.ts = `import { Component, OnInit } from '@angular/core';
        import * as moment from 'moment';
        import { AlertController, NavController } from '@ionic/angular';
        import { ActivatedRoute } from '@angular/router';
        import { ModelsService } from '../../../Models/models';
        import { CommonService } from '../../../Services/Common/common.service';
        import { ${caps(module)}Service } from '../../../Services/${module}/${module}.service';

        @Component({
        selector: '${type}-add-${module}',
        templateUrl: './${type}-${module}.component.html',
        styleUrls: ['./${type}-${module}.component.scss'],
        })
        export class ${caps(type)}${caps(module)}Component implements OnInit {
          ${module}: any = {};
          showLoader: boolean = false;
          constructor(
            public modelService: ModelsService,
            public alertCtrl: AlertController,
            private router: ActivatedRoute,
            public commonService: CommonService,
            public ${module}Service: ${caps(module)}Service,
            public navCtrl: NavController,
          ) { 
          this.router.params.subscribe(params => {
            this.get${caps(module)}(params['id']);
          });      
        }
        ngOnInit() { }
        get${caps(module)}(id){
          this.${module}Service.getSingle${caps(module)}(id).subscribe(snap => {
            this.${module} = snap.payload.data();
            this.${module}.id = snap.payload.id;
          })      
        }

        async delete${caps(module)}Confirm() {
          const alert = await this.alertCtrl.create({
            header: "Delete" + " " + this.${module}.name,
            message: 'This action cannot be reversed',
            inputs: [
              {
                name: 'name',
                type: 'text',
                placeholder: '${caps(module)} Name',
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
                  if (data.name.toLowerCase() == this.${module}.name.toLowerCase()) {
                    this.delete${caps(module)}();
                  } else {
                    this.commonService.presentToast("${caps(module)} Name not Valid");
                  }
                  this.alertCtrl.dismiss();
                }
              }
            ]
          });
          return await alert.present();
       }
      
       delete${caps(module)}() {
        this.showLoader = true;
        this.${module}Service.del${caps(module)}s(this.${module}.id).then(() => {
          this.commonService.presentToast("${caps(module)} Deleted");
          this.showLoader = false;
          this.navCtrl.navigateRoot("/view-${module}");
        })
      }
      edit${caps(module)}() {
        let x = '/edit-${module}/' + this.${module}.id;
        this.navCtrl.navigateRoot(x);
      }
      }
      `;
  }
  if (type == "view") {
    data.html = `<app-main-header></app-main-header>
    <ion-content>
        <app-loader *ngIf="showLoader"></app-loader>
        <ion-grid>
            <ion-row>
                <ion-col size="12" size-md="8" offset-md="1">
    
                    <p class="pageTitle">${caps(module)}s</p>
    
                    <!-- Search bar -->
    
                    <ion-grid [hidden]="showLoader">
                        <ion-row>
                            <ion-col size-md="8" size="12" offset-md="2">
                                <ion-searchbar [(ngModel)]="searchBar" (ionChange)="getItems(searchBar)"
                                    placeholder="Search by ${module}'s Name" type="text">
                                </ion-searchbar>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
    
                    <ion-item>
                        <ion-buttons slot="end">
                            <ion-button (click)="isGrid=true">
                                <ion-icon name="grid"></ion-icon>
                            </ion-button>
                            <ion-button (click)="isGrid=false">
                                <ion-icon name="list"></ion-icon>
                            </ion-button>
                        </ion-buttons>
                    </ion-item>
    
                    <ion-row *ngIf="isGrid">
                        <!-- Add ${caps(module)} -->
                        <ion-col size="12" size-md="4" size-xs="6" routerLink="/add-${module}">
                            <ion-card class="add-card">
                                <ion-button fill="clear" class="addBtn" size="large">
                                    <ion-icon name="add-circle-outline"></ion-icon>
                                </ion-button>
                                <ion-card-content>
                                    <div class="addProjDetailDiv">
                                        <p class="addProjHeader">New ${caps(module)}</p>
                                        <p class="projSubHeader">Add another ${module}</p>
                                    </div>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>
                        <!-- ${caps(module)} List -->
                        <ion-col size="12" size-md="4" size-xs="6" *ngFor="let x of ${module}" (click)="gtDetails(x)"
                            [hidden]="showLoader">
                            <ion-card>
                                <ion-card-content>
                                    <div class="projDetailDiv">
                                        <p class="projHeader">{{x.name}}</p>
                                        <p class="projSubHeader">{{x.timestamp}}</p>
                                    </div>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>
                        <!-- No ${caps(module)} -->
                        <ion-col size="12" size-md="4" size-xs="6" [hidden]="showLoader" *ngIf="!${module}.length">
                            <ion-card>
                                <ion-card-content>
                                    <div class="projDetailDiv">
                                        <p class="projHeader">No ${caps(module)}</p>
                                    </div>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>
                    </ion-row>
    
                    <ion-row *ngIf="!isGrid">
                        <ion-col size="12">
                            <ion-list>
                                <ion-item routerLink="/add-${module}" style="cursor: pointer">
                                    <ion-button fill="clear" size="large">
                                        <ion-icon name="add-circle-outline" class="ion-margin-end"></ion-icon>
                                        Add ${caps(module)}
                                    </ion-button>
                                </ion-item>
                                <ion-item *ngFor="let x of ${module}" (click)="gtDetails(x)" [hidden]="showLoader">
                                    <p class="projHeader">{{x.name}}</p>
                                </ion-item>
                            </ion-list>
                        </ion-col>
                    </ion-row>
    
    
    
                </ion-col>
    
                <ion-col size="12" size-md="3" class="rightCol">
    
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
    `;

    data.sass = `ion-item,ion-content {--ion-background-color: #fafafa;}
        ion-searchbar {--ion-background-color: white;}
        ion-card {border-top: 5px solid #10dc60;background: white !important;min-height: 12.5rem;cursor: pointer;}
        .add-card {border-top: 5px solid #3880ff;}
        .projDetailDiv {position: absolute;top: 7rem !important;}
        .addProjDetailDiv {position: absolute;top: 7rem !important;}
        .addBtn {margin: 0;position: absolute;top: 3.5rem !important;left: 0rem !important;}
        .projHeader {font-size: 1.17rem !important;font-weight: 700;line-height: 2rem;color: #242628;}
        .projSubHeader {font-size: 0.8125rem !important;line-height: 2rem;color: #7699c2;}
        .addProjHeader {font-size: 1.17rem !important;font-weight: 700;line-height: 2rem;color: #3880ff;}`;
    data.ts = `import { Component, OnInit } from '@angular/core';
        import * as moment from 'moment';
        import { NavController } from '@ionic/angular';
        import { ${caps(module)}Service } from '../../../Services/${module}/${module}.service';
        @Component({
          selector: '${type}-add-${module}',
          templateUrl: './${type}-${module}.component.html',
          styleUrls: ['./${type}-${module}.component.scss'],
          })
          export class ${caps(type)}${caps(module)}Component implements OnInit {
            showLoader: boolean = false;
            ${module}: Array<any> = [];
            ${module}Loaded: Array<any> = [];
            isGrid: boolean = true;
            constructor(
              public ${module}Service: ${caps(module)}Service,
              public navCtrl: NavController,
            ) {
              this.get${module}s();
            }
          
            ngOnInit() { }
            get${module}s(){
              this.showLoader = true;
                this.${module}Service.get${caps(module)}s().subscribe(snap => {
                  let tempArray = [];
                  snap.forEach(snip => {
                    let temp: any = snip.payload.doc.data();
                    temp.id = snip.payload.doc.id;
                    temp.timestamp = moment(temp.timestamp).fromNow();
                    tempArray.push(temp);
                  })
                  this.${module} = tempArray;
                  this.${module}Loaded = tempArray;
                  this.showLoader = false;
              });
            }


            initializeItems(): void {
              this.${module} = this.${module}Loaded;
            }
            getItems(searchbar) {
              this.initializeItems();
              let q: string = searchbar;
              if (!q.length) {
                return;
              }
              this.${module} = this.${module}.filter((v) => {
                if ((v.name) && q) {
                  if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                  }
                  return false;
                }
              });
            }
          
            gtDetails(p) {
              let x = '/${module}-details/' + p.id;
              this.navCtrl.navigateRoot(x);
            }
                    

          }`










  }














  createFile(url, `${type}-${module}.component`, "html", data.html);
  createFile(url, `${type}-${module}.component`, "scss", data.sass);
  createFile(url, `${type}-${module}.component`, "spec.ts", data.spects);
  createFile(url, `${type}-${module}.component`, "ts", data.ts);
}
function createFolder(path) {
  let fString = '';
  var np = path.split("/")
  var np1 = [];
  for (var i = 0; i < np.length; i++) {
    if (np[i] == "..") {
      fString = fString + np[i] + "/"
    } else {
      np1.push(np[i])
    }
  }
  let sString = fString;
  for (var i = 0; i < np1.length; i++) {
    mkdirp(sString + np1[i], function (err) {
      if (err) console.error(err)
    });
    sString = sString + np1[i] + "/";
  }
}
function createFile(path, filename, type, content) {
  var fPath = path + '/' + filename + '.' + type;
  fs.writeFile(fPath,
    content,
    function (err) {
      if (err) console.log(err);
    });
}
function caps(str) {
  return str[0].toUpperCase() + str.slice(1);
} 