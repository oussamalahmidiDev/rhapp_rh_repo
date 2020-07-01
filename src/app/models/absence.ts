import { Salarie } from "./salarie";

export interface Absence {
  type: string;
  dateDebut: Date;
  dateFin: Date;
  justificatif: string;
  // etat: string,
  salarie: Salarie;
  id?: number;
  accepted?: boolean | undefined;
}
