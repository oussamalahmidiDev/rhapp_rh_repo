import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
// import { RechargesComponent } from "./components/recharges/recharges.component";
import {AuthenticatedGuard} from './guards/authenticated.guard';
import {WelcomePageComponent} from './views/welcome-page/welcome-page.component';
import {HomeComponent} from './views/home/home.component';

import {AUTH_PROVIDERS} from './services/user.service';
import {GuestGuard} from './guards/guest.guard';
import {PostesComponent} from './components/postes/postes.component';
import {CongesComponent} from './components/conges/conges.component';
import {SalarieComponent} from './components/salarie/salarie.component';
import {SalarieInfosComponent} from './components/salarie-infos/salarie-infos.component';
import {SalarieAbsencesComponent} from './components/salarie-absences/salarie-absences.component';
import {SalarieCongesComponent} from './components/salarie-conges/salarie-conges.component';
import {AbsencesComponent} from './components/absences/absences.component';
import {SalariesListComponent} from './components/salaries-list/salaries-list.component';
import { PosteServiceResolver } from './resolvers/postes.service.resolver';
import { ProfileServiceResolver } from './resolvers/profile.service.resolver';
import {CongesServiceResolver} from './resolvers/conges.service.resolver';
import {SalariesServiceResolver} from './resolvers/salaries.service.resolver';
import {AbsencesServiceResolver} from './resolvers/absences.service.resolver';
import {SalarieServiceResolver} from './resolvers/salarie.service.resolver';
import {SalarieRetraiteComponent} from './components/salarie-retraite/salarie-retraite.component';
import {SalarieAvantagesComponent} from './components/salarie-avantages/salarie-avantages.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: { profile: ProfileServiceResolver },
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'postes',
        component: PostesComponent,
        resolve: { postes: PosteServiceResolver },
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'conges',
        component: CongesComponent,
        resolve: { conges: CongesServiceResolver },
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'absences',
        component: AbsencesComponent,
        resolve: { absences: AbsencesServiceResolver },
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'salaries',
        component: SalariesListComponent,
        resolve: { salaries: SalariesServiceResolver }
      },
      {
        path: 'salaries/:id',
        component: SalarieComponent,
        resolve: {salarie: SalarieServiceResolver },
        children: [
          {path: '', redirectTo: 'infos', pathMatch: 'full'},
          {
            path: 'infos',
            component: SalarieInfosComponent
          },
          {
            path: 'absences',
            component: SalarieAbsencesComponent
          },
          {
            path: 'conges',
            component: SalarieCongesComponent
          },
          {
            path: 'retraites',
            component: SalarieRetraiteComponent,
            // canActivate: [AuthenticatedGuard],
          },
          {
            path: 'avantages',
            component: SalarieAvantagesComponent,
            // canActivate: [AuthenticatedGuard],
          },
        ]


      },
    ],
  },
  {path: '', component: WelcomePageComponent, canActivate: [GuestGuard]},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
