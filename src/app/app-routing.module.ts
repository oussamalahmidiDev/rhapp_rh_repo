import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SettingsComponent} from './components/settings/settings.component';
// import { RechargesComponent } from "./components/recharges/recharges.component";
import {AuthenticatedGuard} from './guards/authenticated.guard';
import {WelcomePageComponent} from './views/welcome-page/welcome-page.component';
import {HomeComponent} from './views/home/home.component';

import {AUTH_PROVIDERS} from './services/user.service';
import {GuestGuard} from './guards/guest.guard';
import {PostesComponent} from './components/postes/postes.component';
import {CongesComponent} from './components/conges/conges.component';
import {RetraitesComponent} from './components/retraites/retraites.component';
import {SalarieComponent} from './components/salarie/salarie.component';
import {SalarieInfosComponent} from './components/salarie-infos/salarie-infos.component';
import {SalarieAbsencesComponent} from './components/salarie-absences/salarie-absences.component';
import {SalarieCongesComponent} from './components/salarie-conges/salarie-conges.component';
import {AbsencesComponent} from './components/absences/absences.component';
import {SalariesListComponent} from './components/salaries-list/salaries-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthenticatedGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        // canActivate: [AuthenticatedGuard],
      },
      {
        path: 'postes',
        component: PostesComponent,
        // canActivate: [AuthenticatedGuard],
      },
      {
        path: 'conges',
        component: CongesComponent,
        // canActivate: [AuthenticatedGuard],
      },
      {
        path: 'absences',
        component: AbsencesComponent,
        // canActivate: [AuthenticatedGuard],
      },
      {
        path: 'retraites',
        component: RetraitesComponent,
        // canActivate: [AuthenticatedGuard],
      },
      {
        path: 'salaries',
        component: SalariesListComponent
      },
      {
        path: 'salaries/:id',
        component: SalarieComponent,
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
          }
        ]


      },

      // {
      //   path: "salaries/1",
      //   component: SalarieComponent,
      //   // canActivate: [AuthenticatedGuard],
      //   children: [
      //     // { path: "", redirectTo: "infos", pathMatch: "full" },
      //     {
      //       path: "infos",
      //       component: SalarieInfosComponent
      //     },
      //     {
      //       path: "absences",
      //       component: SalarieAbsencesComponent
      //     },
      //     {
      //       path: "conges",
      //       component: SalarieCongesComponent
      //     }
      //   ]
      // },
      {
        path: 'settings',
        component: SettingsComponent,
        // canActivate: [AuthenticatedGuard],
      },
      // {
      //   path: "recharges",
      //   component: RechargesComponent,
      //   // canActivate: [AuthenticatedGuard],
      // },
      // { path: "**", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  {path: '', redirectTo: 'home/dashboard', pathMatch: 'full'},


  // { path: 'home', component: HomeComponent,  },
  // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: "", component: WelcomePageComponent, /* canActivate: [GuestGuard] */ },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
