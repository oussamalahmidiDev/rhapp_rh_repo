import {Component, OnInit} from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {TokenService} from '../../../services/token.service';
import {ProfileState} from 'src/app/states/profile.state';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {ModifyPhoto, ModifyProfile, UnsetPhoto} from 'src/app/actions/profile.action';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {

  profileForm: FormGroup;
  compteForm: FormGroup;

  @Select(ProfileState.getProfile)
  currentUser: Observable<User>;

  uploading = false;
  uploadProgress = 0;

  hide = true;

  profileFormSubmitted = false;
  compteFormSubmitted = false;

  compteFormErrors: string[];

  constructor(
    public dialogRef: MatDialogRef<ProfileModalComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private tokenService: TokenService,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.compteFormErrors = [];
    this.profileForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
    });
    this.compteForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      passwords: this.formBuilder.group({
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPasswordConf: ['', [Validators.required, Validators.minLength(6)]]

      }, {validators: this.passwordMatching}),
    });
    this.currentUser.subscribe(user => {
      this.profileForm.patchValue(user);

    });
    console.log('USR PRF', this.currentUser, this.compteForm);

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  passwordMatching(c: AbstractControl): { invalid: boolean } {
    if (c.get('newPassword').value !== c.get('newPasswordConf').value) {
      return {invalid: true};
    }
  }

  closeModal() {
    console.log(this.profileForm.dirty, this.compteForm.touched, this.uploading, this.profileFormSubmitted, this.compteFormSubmitted);

    if (this.profileForm.touched && !this.profileFormSubmitted || this.compteForm.touched && !this.compteFormSubmitted || this.uploading) {
      if (confirm('Vous n\'avez pas sauvegardé les modifications. Voulez-vous continuer ?')) {
        this.dialogRef.close();
      }
    } else {
      this.dialogRef.close();
    }
  }

  deletePhoto() {
    this.store.dispatch(new UnsetPhoto());
    // this.userService.deletePhoto().subscribe(
    //   data => this.currentUser.photo = this.currentUser.avatar_link = null,
    //   error => console.log(error.error)
    // )
  }


  handlePhotoUpload($event) {
    const image = $event.target.files[0];
    // this.store.dispatch(new ModifyPhoto(image)).subscribe(
    //   () => {

    //   }
    // )
    this.userService.uploadAvatar(image)
      .subscribe(
        (data: HttpEvent<any>) => {
          console.log(data);
          if (data.type === HttpEventType.UploadProgress) {
            this.uploading = true;
            this.uploadProgress = Math.round(100 * data.loaded / data.total);
          } else if (data.type === HttpEventType.Response) {
            this.openSnackBar('Photo de profil a été chargée avec succès !');
            this.store.dispatch(new ModifyPhoto(data.body));
            // this.currentUser = data.body;
            this.uploading = false;
          }

        },
        error => {
          console.log(error.error);
        }
      );
  }

  onSubmitProfileForm() {
    console.log(this.profileForm);
    this.store.dispatch(new ModifyProfile(this.profileForm.value)).subscribe(
      () => {
        console.log('PROFILE UPDATED');
        this.profileFormSubmitted = true;
        this.openSnackBar('Les modifications ont été enregistrées !');
      });
  }

  onSubmitCompteForm() {
    this.compteFormErrors = [];
    console.log(this.compteForm);
    console.log(this.compteForm.get('passwords'));
    this.userService.changePassword({
      oldPassword: this.compteForm.value.oldPassword,
      newPassword: this.compteForm.get('passwords').value.newPassword,
      newPasswordConf: this.compteForm.get('passwords').value.newPasswordConf,
    }).subscribe(
      data => {
        this.compteFormSubmitted = true;
        this.openSnackBar('Le mot de passe a été changé avec succès !');
      },
      error => {
        console.log(error.error);
        this.compteFormErrors.push(error.error.message);
      }
    );
  }

}
