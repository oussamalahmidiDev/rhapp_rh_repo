import { Salarie } from './salarie';

export interface Retraite {
      ref: string;
      type: string;
      date: Date,
      etat: string,
      salarie: Salarie
    }