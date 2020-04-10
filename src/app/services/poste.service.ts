import {Injectable} from '@angular/core';
import {Poste} from '../models/poste';
import {Salarie} from '../models/salarie';
import {SalariesService} from './salaries.service';

@Injectable({
  providedIn: 'root'
})
export class PosteService {

  salarie: Salarie = this.salariesService.getSalarie('U73540990');

  postes: Poste[] = [
    {
      nom: 'Gestion de RH',
      direction: 'Direction X',
      division: 'Div X',
      service: 'Service RH',
      competences: ['Cmp 1', 'Comp2'],
      salarie: this.salarie
    },
    {
      nom: 'Gestion de achats',
      direction: 'Direction X',
      division: 'Div X',
      service: 'Service RH',
      competences: ['Cmp 1', 'Comp2'],
      salarie: undefined
    },
    {
      nom: 'Gestion de RH',
      direction: 'Direction X',
      division: 'Div X',
      service: 'Service RH',
      competences: ['Cmp 1', 'Comp2'],
      salarie: this.salarie
    },
  ];

  constructor(private salariesService: SalariesService) {

  }
}
