import {Poste} from '../models/poste';

export class GetPostes {
  static readonly type = '[Postes] Get';
}

export class CreatePoste {
  static readonly type = '[Postes] CREATE';

  constructor(public payload: Poste) {
  }
}

export class AffecterSalarie {
  static readonly type = '[Postes] AFFECTER';

  constructor(public id: number, public payload: any) {
  }
}

export class DeletePosteSalarie {
  static readonly type = '[Postes] DELETE SALARIE';

  constructor(public id: number) {
  }
}

export class DeletePoste {
  static readonly type = '[Postes] DELETE';

  constructor(public id: number) {
  }
}
