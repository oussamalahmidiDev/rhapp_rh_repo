import { Injectable } from '@angular/core';
import {Salarie} from '../models/salarie';

@Injectable({
  providedIn: 'root'
})
export class SalariesService {

  salaries: Salarie[] = [
    {
      direction: 'Gestion RH', division: `Divison d'achats`, numDeSomme: 'U73540990', service: `Service de gestion`,
      nom: 'Lahmidi Oussama',
      photo: 'https://picsum.photos/300',
      email: 'oussama@g.c',
      tel: '065656565',
      cin: 'U00000000',
      adresse: 'Nº 000 Quartier X',
      dateNaissance: '65 Sept 0000',
      lieuNaissance: 'Safi Boudheb'
    },
    {
      direction: 'Gestion RH', division: `Divison d'achats`, numDeSomme: 'U735409090', service: '',
      nom: 'Sit Amet Dolor',
      photo: 'https://picsum.photos/300',
      email: 'oussama@g.c',
      tel: '065656565',
      cin: 'U00000000',
      adresse: 'Nº 000 Quartier X',
      dateNaissance: '65 Sept 0000',
      lieuNaissance: 'Safi Boudheb'
    },
    {
      direction: 'Gestion RH', division: `Divison d'achats`, numDeSomme: 'U73540900', service: '',
      nom: 'Lorem Ipsum',
      photo: 'https://picsum.photos/300',
      email: 'oussama@g.c',
      tel: '065656565',
      cin: 'U00000000',
      adresse: 'Nº 000 Quartier X',
      dateNaissance: '65 Sept 0000',
      lieuNaissance: 'Safi Boudheb'
    },
  ];

  getSalarie(id): Salarie {
    return this.salaries.find(salarie => id === salarie.numDeSomme);
  }

  constructor() { }
}
