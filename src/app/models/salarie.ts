import { Direction } from './direction';
import { Service } from './service';

export interface Salarie {
      id?: number;
      // infos pers
      nom: string;
      prenom: string;
      photo?: string;
      numSomme: string;
      email: string;
      cin?: string;
      adresse?: string;
      dateNaissance?: string;
      lieuNaissance?: string;
      telephone?: string;
      dateCreation?: Date;
      solde: number;

      // infos prof
      division?: string;
      direction?: Direction;
      service?: Service;
      diplomeObt?: string;
      fonction?: string;

  

      // contact urgence

      cinUrg?: string;
      nomUrgence?: string;
      adresseUrgence?: string;
      telUrgence?: string;
      emailUrg?: string;
    }
