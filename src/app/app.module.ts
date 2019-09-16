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
import { HomeService } from './Services/Home/home.service';
import { PrivacyPolicyComponent } from './Components/Extras/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './Components/Extras/terms-and-conditions/terms-and-conditions.component';
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
import * as firebase from 'firebase';
import { AllUsersComponent } from './Components/Users/all-users/all-users.component';
import { AddUserComponent } from './Components/Users/add-user/add-user.component';
import { UserDetailsComponent } from './Components/Users/user-details/user-details.component';
import { AddClientComponent } from './Components/Clients/add-client/add-client.component';
import { ClientDetailsComponent } from './Components/Clients/client-details/client-details.component';
import { EditClientsComponent } from './Components/Clients/edit-clients/edit-clients.component';
import { ViewClientsComponent } from './Components/Clients/view-clients/view-clients.component';
import { SetupComponent } from './Components/Extras/setup/setup.component';
import { HomeComponent } from './Components/Extras/home/home.component';
firebase.initializeApp(firebaseConfig);


import { AddEmailComponent } from './Components/Email/add-email/add-email.component';
import { EditEmailComponent } from './Components/Email/edit-email/edit-email.component';
import { DetailsEmailComponent } from './Components/Email/details-email/details-email.component';
import { ViewEmailComponent } from './Components/Email/view-email/view-email.component';
import { ChatComponent } from './Components/Messaging/chat/chat.component';
import { ChatBoxComponent } from './Components/Messaging/chat-box/chat-box.component';
import { ChatUsersComponent } from './Components/Messaging/chat-users/chat-users.component';
import { MessagingService } from './Services/Messaging/messaging.service';

@NgModule({

  declarations: [
    AppComponent,
    /*Email*/
    AddEmailComponent,
    EditEmailComponent,
    DetailsEmailComponent,
    ViewEmailComponent,

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
    //Users
    AllUsersComponent,
    AddUserComponent,
    UserDetailsComponent,
    //Clients
    AddClientComponent,
    ClientDetailsComponent,
    EditClientsComponent,
    ViewClientsComponent,
    //Messaging
    ChatComponent,
    ChatBoxComponent,
    ChatUsersComponent,
  ],
  entryComponents: [
    MainHeaderComponent,
    LoaderComponent,
    ChatBoxComponent,
    ChatUsersComponent,
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
    MessagingService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
