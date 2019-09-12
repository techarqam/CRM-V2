import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { firebaseConfig } from './firebaseConfig';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './Components/home/home.component';
import { HomeService } from './Services/Home/home.service';
import { PrivacyPolicyComponent } from './Components/Extras/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './Components/Extras/terms-and-conditions/terms-and-conditions.component';
import { SetupComponent } from './Components/setup/setup.component';
import { CommonService } from './Services/Common/common.service';
import { ModelsService } from './Models/models';
import { AuthGuard } from './Guards/Auth/auth.guard';
import { NegAuthGuard } from './Guards/Auth/neg-auth.guard';
import { DashboardComponent } from './Components/MainComponents/dashboard/dashboard.component';
import { ProjectService } from './Services/Projects/project.service';
import { ClientsService } from './Services/Clients/clients.service';
import { UserService } from './Services/Users/user.service';
import { AuthService } from './Services/Auth/auth.service';
import { LoginComponent } from './Components/Auth/login/login.component';
import { MainHeaderComponent } from './Components/Extras/Headers/main-header/main-header.component';
import { AddProjectComponent } from './Components/Projects/add-project/add-project.component';
import { ArchivedProjectsComponent } from './Components/Projects/archived-projects/archived-projects.component';
import { EditProjectsComponent } from './Components/Projects/edit-projects/edit-projects.component';
import { ProjectDetailsComponent } from './Components/Projects/project-details/project-details.component';
import { ViewProjectsComponent } from './Components/Projects/view-projects/view-projects.component';
import { LoaderComponent } from './Components/Extras/Loaders/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SetupComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    DashboardComponent,
    LoginComponent,
    MainHeaderComponent,
    LoaderComponent,

    //Projects
    AddProjectComponent,
    ArchivedProjectsComponent,
    EditProjectsComponent,
    ProjectDetailsComponent,
    ViewProjectsComponent,

  ],
  entryComponents: [
    MainHeaderComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    FormsModule,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    HomeService,
    CommonService,
    ModelsService,
    AuthGuard,
    NegAuthGuard,
    ProjectService,
    ClientsService,
    UserService,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
