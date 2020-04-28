import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {Compte} from 'src/app/models/compte';

const ELEMENT_DATA: Compte[] = [
  {numeroCompte: '67139051493590', intitule: 'M. LAHMIDI Oussama', solde: '120', dateOperation: '12 Mars 2020'},
  {numeroCompte: '67139051493590', intitule: 'M. LAHMIDI Oussama', solde: '120', dateOperation: '12 Mars 2020'},
  {numeroCompte: '67139051493590', intitule: 'M. LAHMIDI Oussama', solde: '120', dateOperation: '12 Mars 2020'},
  {numeroCompte: '67139051493590', intitule: 'M. LAHMIDI Oussama', solde: '120', dateOperation: '12 Mars 2020'},
];

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  currentUser: User;

  numberFormisVisible = false;
  emailFormisVisible = false;

  displayedColumns: string[] = ['numeroCompte', 'intitule', 'solde', 'dateOperation', 'actions'];
  dataSource = ELEMENT_DATA;

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
  }

  handlePhotoUpload($event) {
    console.log($event.target.files);
  }


}
