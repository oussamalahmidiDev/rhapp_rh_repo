import { Salarie } from './salarie';

export interface Poste {
      nom: string;
      direction: string;
      division: string;
      service: string,
      competences: string[],
      salarie: Salarie
      // statut: string
    }