import {CongeMaladieRequest} from '../models/congeMaladieRequest';

export class GetConges {
  static readonly type = '[Conges] Get';
}

export class AddCongeMaladie {
  static readonly type = '[Conges] CREATE MALADIE';

  constructor(public payload: CongeMaladieRequest) {
  }
}
