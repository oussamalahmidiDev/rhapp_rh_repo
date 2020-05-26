import {CongeMaladieRequest} from '../models/congeMaladieRequest';

export class GetConges {
  static readonly type = '[Conges] Get';
}

export class AddCongeMaladie {
  static readonly type = '[Conges] CREATE MALADIE';

  constructor(public payload: CongeMaladieRequest) {
  }
}

export class RepondreConge {
  static readonly type = '[Conges] REPONDRE';

  constructor(public id: number, public payload: any) {
  }
}
