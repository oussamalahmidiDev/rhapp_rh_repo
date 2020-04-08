import { Salarie } from './salarie';

export interface Conge {
      motif: string;
      type: string;
      dateDeDebut: Date;
      dateDeFin: Date,
      etat: { etat: string, motif: string },
      salarie: Salarie
      // statut: string
    }