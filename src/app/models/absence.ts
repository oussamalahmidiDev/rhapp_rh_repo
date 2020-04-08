import { Salarie } from './salarie';

export interface Absence {
      type: string;
      dateDeDebut: Date;
      dateDeFin: Date;
      justificatif: string;
      // etat: string,
      salarie: Salarie;
    }
