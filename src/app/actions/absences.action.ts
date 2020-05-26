export class GetAbsences {
  static readonly type = '[Absences] Get';
}

export class AddAbsence {
  static readonly type = '[Absences] CREATE';

  constructor(public payload: FormData) {
  }
}
