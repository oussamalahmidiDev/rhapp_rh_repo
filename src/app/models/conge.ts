import { Salarie } from './salarie';

export interface Conge {
      id?: number;
      motif: string;
      type: {
        typeConge: string
      };
      dateDebut: Date;
      dateFin: Date,
      etat: string,
      salarie: Salarie;

      reponse: string;
      // statut: string
    }