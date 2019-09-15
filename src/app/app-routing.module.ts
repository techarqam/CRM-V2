import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { PrivacyPolicyComponent } from './Components/Extras/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './Components/Extras/terms-and-conditions/terms-and-conditions.component';
import { SetupComponent } from './Components/setup/setup.component';
import { NegAuthGuard } from './Guards/Auth/neg-auth.guard';
import { AuthGuard } from './Guards/Auth/auth.guard';
import { DashboardComponent } from './Components/MainComponents/dashboard/dashboard.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { AddProjectComponent } from './Components/Projects/add-project/add-project.component';
import { ArchivedProjectsComponent } from './Components/Projects/archived-projects/archived-projects.component';
import { EditProjectsComponent } from './Components/Projects/edit-projects/edit-projects.component';
import { ProjectDetailsComponent } from './Components/Projects/project-details/project-details.component';
import { ViewProjectsComponent } from './Components/Projects/view-projects/view-projects.component';
import { AllUsersComponent } from './Components/Users/all-users/all-users.component';
import { AddUserComponent } from './Components/Users/add-user/add-user.component';
import { UserDetailsComponent } from './Components/Users/user-details/user-details.component';
import { ViewClientsComponent } from './Components/Clients/view-clients/view-clients.component';
import { AddClientComponent } from './Components/Clients/add-client/add-client.component';
import { EditClientsComponent } from './Components/Clients/edit-clients/edit-clients.component';
import { ClientDetailsComponent } from './Components/Clients/client-details/client-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [NegAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NegAuthGuard]
  },
  {
    path: 'setup',
    component: SetupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  //Projects
  {
    path: 'projects',
    component: ViewProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-project',
    component: AddProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-project/:id',
    component: EditProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'project-details/:id',
    component: ProjectDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'archived-projects',
    component: ArchivedProjectsComponent,
    canActivate: [AuthGuard]
  },
  //Users
  {
    path: 'all-users',
    component: AllUsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent,
    canActivate: [AuthGuard]
  },
  //Clients
  {
    path: 'clients',
    component: ViewClientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-client',
    component: AddClientComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'edit-client',
  //   component: EditClientsComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'client-details/:id',
  //   component: ClientDetailsComponent,
  //   canActivate: [AuthGuard]
  // },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
