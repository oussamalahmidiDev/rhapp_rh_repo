import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { MatSliderModule } from '@angular/material/slider';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialog,
  MatDialogModule,
  MatTableModule,
  MatSnackBarModule,
  MatStepperModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatOptionModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  MatDatepicker,
  MatExpansionModule, MatSortModule, MatProgressSpinnerModule, MatTooltipModule, MatChipsModule, MatProgressBarModule, MatCheckboxModule
} from '@angular/material';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { VirementsComponent } from './components/virements/virements.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RechargesComponent } from './components/recharges/recharges.component';
// import { RechargeFormComponent } from './components/recharge-form/recharge-form.component';
import { WelcomePageComponent } from './views/welcome-page/welcome-page.component';
import { HomeComponent } from './views/home/home.component';

// import { VirementFormComponent } from './components/virement-form/virement-form.component';
import { HttpClientModule } from '@angular/common/http';
import { PostesComponent } from './components/postes/postes.component';
import { CongesComponent } from './components/conges/conges.component';
import { SalarieComponent } from './components/salarie/salarie.component';
import { SalarieInfosComponent } from './components/salarie-infos/salarie-infos.component';
import { SalarieAbsencesComponent } from './components/salarie-absences/salarie-absences.component';
import { SalarieCongesComponent } from './components/salarie-conges/salarie-conges.component';
import {AbsencesComponent} from './components/absences/absences.component';
import {CongeReponseFormComponent} from './components/forms/conge-reponse-form/conge-reponse-form.component';
import {RetraiteFormComponent} from './components/forms/retraite-form/retraite-form.component';
import { SalariesListComponent } from './components/salaries-list/salaries-list.component';
import { SalariesComponent } from './salaries/salaries.component';
import {PosteFormComponent} from './components/forms/poste-form/poste-form.component';
import {CongeFormComponent} from './components/forms/conge-form/conge-form.component';
import { PosteAffectationFormComponent } from './components/forms/poste-affectation-form/poste-affectation-form.component';
import { AbsenceFormComponent } from './components/forms/absence-form/absence-form.component';
import { CongeMaladieFormComponent } from './components/forms/conge-maladie-form/conge-maladie-form.component';
import { ProfileModalComponent } from './components/forms/profile-modal/profile-modal.component';
import { SalarieFormComponent } from './components/forms/salarie-form/salarie-form.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import {SalarieRetraiteComponent} from './components/salarie-retraite/salarie-retraite.component';
import { SalarieAvantagesComponent } from './components/salarie-avantages/salarie-avantages.component';
import { AvantageFormComponent } from './components/forms/avantage-form/avantage-form.component';
import { AvantageRejetFormComponent } from './components/forms/avantage-rejet-form/avantage-rejet-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WelcomePageComponent,
    HomeComponent,


    PostesComponent,
    PosteFormComponent,
    CongesComponent,
    CongeFormComponent,
    CongeReponseFormComponent,
    AbsencesComponent,
    SalarieRetraiteComponent,
    RetraiteFormComponent,
    SalarieComponent,
    SalarieInfosComponent,
    SalarieAbsencesComponent,
    SalarieCongesComponent,
    SalariesListComponent,
    SalariesComponent,
    PosteAffectationFormComponent,
    AbsenceFormComponent,
    CongeMaladieFormComponent,
    ProfileModalComponent,
    SalarieFormComponent,
    SearchResultsComponent,
    SalarieAvantagesComponent,
    AvantageFormComponent,
    AvantageRejetFormComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    LayoutModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    MatStepperModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule,
    MatMenuModule,
    MatProgressBarModule,
    MatCheckboxModule,


    // MDBBootstrapModule.forRoot()
  ],
  providers: [{
      provide: MatDialogRef,
      useValue: {}
    }, {
      provide: MAT_DIALOG_DATA,
      useValue: {} // Add any data you wish to test if it is passed/used correctly
    },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {
      provide: MatDatepickerModule,
      useValue: {}
    }


  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PosteFormComponent,
    PosteAffectationFormComponent,
    CongeReponseFormComponent,
    RetraiteFormComponent,
    CongeFormComponent,
    AbsenceFormComponent,
    CongeMaladieFormComponent,
    ProfileModalComponent,
    SalarieFormComponent,
    SearchResultsComponent,
    AvantageFormComponent,
    AvantageRejetFormComponent
  ]
})
export class AppModule { }
