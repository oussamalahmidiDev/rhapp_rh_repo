import { Direction } from "./direction";
import { Service } from "./service";
import { Poste } from "./poste";
import { Retraite } from "./retraite";
import { AvantageNature } from "./avatange";
import { Absence } from "./absence";
import { Conge } from "./conge";
import { Diplome } from "./diplome";

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
  solde?: number;

  etatFamiliale?: string;
  nmbEnf?: number;

  // infos prof
  division?: string;
  direction?: Direction;
  service?: Service;
  diplomeObt?: Diplome[];
  fonction?: string;
  cv?: string;

  // contact urgence

  cinUrg?: string;
  nomUrg?: string;
  prenomUrg?: string;
  adresseUrg?: string;
  telUrgence?: string;
  emailUrg?: string;

  poste?: Poste;
  retraite?: Retraite;
  avantages?: AvantageNature[];
  absences?: Absence[];
  conges?: Conge[];
}

// export class Salarie implements ISalarie {
//   id?: number;
//   nom: string;
//   prenom: string;
//   photo?: string;
//   numSomme: string;
//   email: string;
//   cin?: string;
//   adresse?: string;
//   dateNaissance?: string;
//   lieuNaissance?: string;
//   telephone?: string;
//   dateCreation?: Date;
//   solde?: number;
//   division?: string;
//   direction?: Direction;
//   service?: Service;
//   diplomeObt?: Diplome[];
//   fonction?: string;
//   cinUrg?: string;
//   nomUrg?: string;
//   prenomUrg?: string;
//   adresseUrg?: string;
//   telUrgence?: string;
//   emailUrg?: string;
//   poste?: Poste;
//   retraite?: Retraite;
//   avantages?: AvantageNature[];
//   absences?: Absence[];
//   conges?: Conge[];

// }
