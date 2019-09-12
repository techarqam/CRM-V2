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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [NegAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [NegAuthGuard]
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
    path: 'edit-project',
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

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
