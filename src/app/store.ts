import { User } from "./models/user";
import { Salarie } from "./models/salarie";
import { Poste } from "./models/poste";
import { Absence } from "./models/absence";
import { Service } from "./models/service";
import { Direction } from "./models/direction";
import { Conge } from "./models/conge";
import { Activity } from "./models/activity";

export class MainStore {
  profile: User;
  postes: Poste[];
  salaries: Salarie[];
  absences: Absence[];
  services: Service[];
  directions: Direction[];
  conges: Conge[];
  selectedSalarie: Salarie;

  users: User[];
  // events:

  fetching: boolean;
  offline: boolean;

  journal: { utilisateurs: Activity[]; personnel: Activity[] };
  notifications: Notification[];
}
