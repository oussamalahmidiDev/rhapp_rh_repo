import { Salarie } from './salarie';
import { Direction } from './direction';
import { Service } from './service';

export interface Poste {
  id?: number;
  dateCreation: Date;
  dateModification: Date;

      nom: string;
      direction: Direction;
      division: string;
      service: Service,
      competences: string[],
      salarie?: Salarie
      // statut: string
    }