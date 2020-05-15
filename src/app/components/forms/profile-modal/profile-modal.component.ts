import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {

  profileForm: FormGroup;
  compteForm: FormGroup;

  uploading = false;
  uploadProgress = 0;

  hide = true;

  profileFormSubmitted = false;
  compteFormSubmitted = false;

  compteFormErrors: string[];

  constructor(
    public dialogRef: MatDialogRef<ProfileModalComponent>, 
    private _formBuilder: FormBuilder, 
    private _snackBar: MatSnackBar,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public currentUser: User,
  ) { }

  ngOnInit() {
    this.compteFormErrors = [];
    console.log("USR PRF", this.currentUser);
    this.profileForm = this._formBuilder.group({
      nom: [this.currentUser.nom, Validators.required],
      prenom: [this.currentUser.prenom, Validators.required],
      telephone: [this.currentUser.telephone],
    });
    this.compteForm = this._formBuilder.group({
      oldPassword: ['', Validators.required],
      passwords: this._formBuilder.group({
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPasswordConf: ['', [Validators.required, Validators.minLength(6)]]
        
      }, { validators: this.passwordMatching }),
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  passwordMatching(c: AbstractControl): { invalid: boolean } {
    if (c.get('newPassword').value !== c.get('newPasswordConf').value) {
        return {invalid: true};
    }
  }

  closeModal() {
    console.log(this.profileForm.dirty, this.compteForm.dirty, this.uploading, this.profileFormSubmitted, this.compteFormSubmitted);
    
    if (this.profileForm.dirty && !this.profileFormSubmitted || this.compteForm.dirty && !this.compteFormSubmitted || this.uploading) {
      if (confirm("Vous n'avez pas sauvegardé les modifications. Voulez-vous continuer ?")) {
        this.dialogRef.close(this.currentUser);
      }
    } else {
      this.dialogRef.close(this.currentUser);
    }
  }

  deletePhoto() {
    this.userService.deletePhoto().subscribe(
      data => this.currentUser.photo = this.currentUser.avatar_link = null,
      error => console.log(error.error)
    )
  }

  
  handlePhotoUpload ($event) {
    const image = $event.target.files[0];
    this.userService.uploadAvatar(image)
    .subscribe(
      (data: HttpEvent<any>)=> {
        console.log(data);
        if (data.type === HttpEventType.UploadProgress) {
          this.uploading = true;
          this.uploadProgress = Math.round(100 * data.loaded / data.total);
        }
        else if (data.type === HttpEventType.Response) {
          this.openSnackBar("Photo de profil a été chargée avec succès !");
          this.currentUser = data.body;
          this.uploading = false;
        }

      },
      error => {
        console.log(error.error)
      }
    );
  }

  onSubmitProfileForm() {
    console.log(this.profileForm);
    this.userService.modifierProfile(this.profileForm.value).subscribe(
      data => {
        this.currentUser = data;
        this.profileFormSubmitted = true;
        this.openSnackBar("Les modifications ont été enregistrées !");
      },
      error => {}
    );
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
      data => { this.compteFormSubmitted = true; this.openSnackBar("Le mot de passe a été changé avec succès !")},
      error => {console.log(error.error); this.compteFormErrors.push(error.error.message)}
    )
  }

}
