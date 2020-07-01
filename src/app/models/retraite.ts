import { Salarie } from "./salarie";

export interface Retraite {
  id?: number;
  etat?: string;
  dateRetraite: Date;
  dateValidation?: Date;
  remarques?: string;
  salarie?: Salarie;
  reference: string;
  type?: { id?: number; typeRetraite: string };
}
