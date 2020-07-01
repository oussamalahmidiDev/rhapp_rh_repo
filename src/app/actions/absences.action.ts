import { Absence } from "../models/absence";

export class GetAbsences {
  static readonly type = "[Absences] Get";
}

export class AddAbsence {
  static readonly type = "[Absences] CREATE";

  constructor(public payload: Absence) {}
}

export class RepondreAbsence {
  static readonly type = "[Absences] REPONDRE";

  constructor(public id: number, public avis: string) {}
}
export class DeleteAbsence {
  static readonly type = "[Absences] DELETE";

  constructor(public id: number) {}
}
