import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatSliderModule } from "@angular/material/slider";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";
import {
  MAT_DATE_LOCALE,
  MAT_DIALOG_DATA,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDialogRef,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from "@angular/material";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WelcomePageComponent } from "./views/welcome-page/welcome-page.component";
import { HomeComponent } from "./views/home/home.component";

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { PostesComponent } from "./components/postes/postes.component";
import { CongesComponent } from "./components/conges/conges.component";
import { SalarieComponent } from "./components/salarie/salarie.component";
import { SalarieInfosComponent } from "./components/salarie-infos/salarie-infos.component";
import { SalarieAbsencesComponent } from "./components/salarie-absences/salarie-absences.component";
import { SalarieCongesComponent } from "./components/salarie-conges/salarie-conges.component";
import { AbsencesComponent } from "./components/absences/absences.component";
import { CongeReponseFormComponent } from "./components/forms/conge-reponse-form/conge-reponse-form.component";
import { RetraiteFormComponent } from "./components/forms/retraite-form/retraite-form.component";
import { SalariesListComponent } from "./components/salaries-list/salaries-list.component";
import { SalariesComponent } from "./salaries/salaries.component";
import { PosteFormComponent } from "./components/forms/poste-form/poste-form.component";
// import {CongeFormComponent} from './components/forms/conge-form/conge-form.component';
import { PosteAffectationFormComponent } from "./components/forms/poste-affectation-form/poste-affectation-form.component";
import { AbsenceFormComponent } from "./components/forms/absence-form/absence-form.component";
import { CongeMaladieFormComponent } from "./components/forms/conge-maladie-form/conge-maladie-form.component";
import { ProfileModalComponent } from "./components/forms/profile-modal/profile-modal.component";
import { SalarieFormComponent } from "./components/forms/salarie-form/salarie-form.component";
import { SearchResultsComponent } from "./components/search-results/search-results.component";
import { SalarieRetraiteComponent } from "./components/salarie-retraite/salarie-retraite.component";
import { SalarieAvantagesComponent } from "./components/salarie-avantages/salarie-avantages.component";
import { AvantageFormComponent } from "./components/forms/avantage-form/avantage-form.component";
import { AvantageRejetFormComponent } from "./components/forms/avantage-rejet-form/avantage-rejet-form.component";
import { MainHttpInterceptor } from "./http.interceptor";
import { BackgroundUrlPipe } from "./pipes/background-url.pipe";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxTrimDirectiveModule } from "ngx-trim-directive";

import { environment } from "../environments/environment";
import { ProfileState } from "./states/profile.state";
import { SalariesState } from "./states/salaries.state";
import { PostesState } from "./states/postes.state";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ServicesState } from "./states/services.state";
import { DirectionsState } from "./states/directions.state";
import { AbsencesState } from "./states/absences.state";
import { CongesState } from "./states/conges.state";
import { AppState } from "./states/app.state";
import { ServiceWorkerModule } from "@angular/service-worker";
import { CacheService } from "./services/cache.service";
import { BlobPipe } from "./pipes/blob.pipe";
import { NotFoundComponent } from "./views/not-found/not-found.component";
import { UsersComponent } from "./components/utilisateurs/users.component";
import { UserFormComponent } from "./components/forms/user-form/user-form.component";
import { UserUpdateFormComponent } from "./components/forms/user-updateform/user-update-form.component";
import { UsersState } from "./states/users.state";
import { JournalComponent } from "./components/journal/journal.component";
import { JournalState } from "./states/evenements.state";
import { NotificationsState } from "./states/notifications.state";
import { JournalPersonnelComponent } from "./components/journal-personnel/journal-personnel.component";
import { StompRService } from "@stomp/ng2-stompjs";
import { WebsocketService } from "./services/websocket.service";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WelcomePageComponent,
    HomeComponent,
    NotFoundComponent,

    UsersComponent,
    PostesComponent,
    PosteFormComponent,
    CongesComponent,
    // CongeFormComponent,
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
    AvantageRejetFormComponent,
    BackgroundUrlPipe,
    BlobPipe,
    NavbarComponent,
    JournalComponent,
    JournalPersonnelComponent,

    UserFormComponent,
    UserUpdateFormComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
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

    NgxTrimDirectiveModule,

    NgxsModule.forRoot(
      [
        AppState,
        ProfileState,
        SalariesState,
        PostesState,
        ServicesState,
        DirectionsState,
        AbsencesState,
        CongesState,
        UsersState,
        JournalState,
        NotificationsState,
      ],
      { developmentMode: true }
    ),

    // NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    // NgxsStoragePluginModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [
    StompRService,
    WebsocketService,
    BackgroundUrlPipe,
    BlobPipe,
    CacheService,
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}, // Add any data you wish to test if it is passed/used correctly
    },
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
    {
      provide: MatDatepickerModule,
      useValue: {},
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UserFormComponent,
    UserUpdateFormComponent,
    PosteFormComponent,
    PosteAffectationFormComponent,
    CongeReponseFormComponent,
    RetraiteFormComponent,
    // CongeFormComponent,
    AbsenceFormComponent,
    CongeMaladieFormComponent,
    ProfileModalComponent,
    SalarieFormComponent,
    SearchResultsComponent,
    AvantageFormComponent,
    AvantageRejetFormComponent,
  ],
})
export class AppModule {}
