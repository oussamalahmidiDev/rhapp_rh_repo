import {Absence} from '../models/absence';

export class GetAbsences {
  static readonly type = '[Absences] Get';
}

export class AddAbsence {
  static readonly type = '[Absences] CREATE';

  constructor(public payload: Absence) {
  }
}

export class DeleteAbsence {
  static readonly type = '[Absences] DELETE';

  constructor(public id: number) {
  }
}
