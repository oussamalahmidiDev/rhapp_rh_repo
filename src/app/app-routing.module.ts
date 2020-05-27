import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthenticatedGuard} from './guards/authenticated.guard';
import {WelcomePageComponent} from './views/welcome-page/welcome-page.component';
import {HomeComponent} from './views/home/home.component';
import {GuestGuard} from './guards/guest.guard';
import {PostesComponent} from './components/postes/postes.component';
import {CongesComponent} from './components/conges/conges.component';
import {SalarieComponent} from './components/salarie/salarie.component';
import {SalarieInfosComponent} from './components/salarie-infos/salarie-infos.component';
import {SalarieAbsencesComponent} from './components/salarie-absences/salarie-absences.component';
import {SalarieCongesComponent} from './components/salarie-conges/salarie-conges.component';
import {AbsencesComponent} from './components/absences/absences.component';
import {SalariesListComponent} from './components/salaries-list/salaries-list.component';
import {ProfileServiceResolver} from './resolvers/profile.service.resolver';
import {SalarieServiceResolver} from './resolvers/salarie.service.resolver';
import {SalarieRetraiteComponent} from './components/salarie-retraite/salarie-retraite.component';
import {SalarieAvantagesComponent} from './components/salarie-avantages/salarie-avantages.component';
import {NotFoundComponent} from './views/not-found/not-found.component';
import {UsersComponent} from './components/utilisateurs/users.component';
import {JournalComponent} from './components/journal/journal.component';
import {AdminGuard} from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: {profile: ProfileServiceResolver},
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'utilisateurs',
        component: UsersComponent,
        canActivate: [AuthenticatedGuard, AdminGuard]
      },
      {
        path: 'journal',
        component: JournalComponent,
        canActivate: [AuthenticatedGuard]
      },
      {
        path: 'postes',
        component: PostesComponent,
        // resolve: { postes: PosteServiceResolver },
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'conges',
        component: CongesComponent,
        // resolve: { conges: CongesServiceResolver },
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'absences',
        component: AbsencesComponent,
        // resolve: { absences: AbsencesServiceResolver },
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'salaries',
        component: SalariesListComponent,
        canActivate: [AuthenticatedGuard],
        // resolve: { salaries: SalariesServiceResolver }
      },
      {
        path: 'salaries/:id',
        component: SalarieComponent,
        canActivate: [AuthenticatedGuard],
        resolve: {salarie: SalarieServiceResolver},
        children: [
          {path: '', redirectTo: 'infos', pathMatch: 'full'},
          {
            path: 'infos',
            canActivate: [AuthenticatedGuard],
            component: SalarieInfosComponent
          },
          {
            path: 'absences',
            canActivate: [AuthenticatedGuard],
            component: SalarieAbsencesComponent
          },
          {
            path: 'conges',
            canActivate: [AuthenticatedGuard],
            component: SalarieCongesComponent
          },
          {
            path: 'retraites',
            canActivate: [AuthenticatedGuard],
            component: SalarieRetraiteComponent
          },
          {
            path: 'avantages',
            canActivate: [AuthenticatedGuard],
            component: SalarieAvantagesComponent
          },
        ]


      },
    ],
  },
  {path: '', component: WelcomePageComponent, canActivate: [GuestGuard]},
  {path: '**', component: NotFoundComponent},
  {path: 'error', component: NotFoundComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
