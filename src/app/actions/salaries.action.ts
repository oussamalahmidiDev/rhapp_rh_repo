import { Salarie } from "../models/salarie";
import { Retraite } from "../models/retraite";
import { AvantageNature } from "../models/avatange";

export class GetSalaries {
  static readonly type = "[Salaries] Get";
}

export class GetSalarieById {
  static readonly type = "[Salaries] Get One";

  constructor(public id: number) {}
}

export class LoadSalariePhoto {
  static readonly type = "[Salaries] Get PHOTO";

  constructor(public id: number, public payload: string) {}
}

export class ModifierSalarie {
  static readonly type = "[Salaries] UPDATE";

  constructor(public id: number, public payload: Salarie) {}
}

export class DeleteSalariePoste {
  static readonly type = "[Salaries] POSTE DELETE";
}

export class AddSalarie {
  static readonly type = "[Salaries] CREATE";

  constructor(public payload: Salarie) {}
}

export class AddRetraite {
  static readonly type = "[Salaries] RETRAITE CREATE";

  constructor(public payload: Retraite) {}
}

export class ModifierRetraite {
  static readonly type = "[Salaries] RETRAITE MODIFER";

  constructor(public payload: Retraite) {}
}
export class SupprimerRetraite {
  static readonly type = "[Salaries] RETRAITE SUPPRIMER";

  constructor(public id: number) {}
}

export class AddAvantage {
  static readonly type = "[Salaries] AVANTAGES ADD";

  constructor(public payload: AvantageNature) {}
}

export class RetirerAvantages {
  static readonly type = "[Salaries] AVANTAGES RETIER";

  constructor(public payload: AvantageNature[]) {}
}

export class SupprimerAvantage {
  static readonly type = "[Avantage] SUPPRIMER";

  constructor(public id: number) {}
}
export class ValiderRetraite {
  static readonly type = "[Salaries] RETRAITE VALIDER";
  constructor(public payload: { remarques: string }) {}
}

export class DeleteSalarie {
  static readonly type = "[Salaries] DELETE";

  constructor(public id: number, public payload: Salarie) {}
}

export class RepondreSelectedSalarieAbsence {
  static readonly type = "[SelectedSalarie.Absences] REPONDRE";

  constructor(public id: number, public avis: string) {}
}

export class DeleteSelectedSalarieAbsence {
  static readonly type = "[SelectedSalarie.Absences] DELETE";

  constructor(public id: number) {}
}
