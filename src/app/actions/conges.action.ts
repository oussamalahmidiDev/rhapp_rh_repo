import { CongeMaladieRequest } from "../models/congeMaladieRequest";

export class GetConges {
  static readonly type = "[Conges] Get";
}

export class GetParametres {
  static readonly type = "[Conges.parametres] Get";
}

export class ChangeParametres {
  static readonly type = "[Conges.parametres] Change";
  constructor(public payload: any) {}
}

export class AddCongeMaladie {
  static readonly type = "[Conges] CREATE MALADIE";

  constructor(public payload: CongeMaladieRequest) {}
}

export class ModifierConge {
  static readonly type = "[Conges] UPDATE";

  constructor(public id: number, public payload: any) {}
}

export class RepondreConge {
  static readonly type = "[Conges] REPONDRE";

  constructor(public id: number, public payload: any) {}
}

export class DeleteConge {
  static readonly type = "[Conges] DELETE";

  constructor(public id: number) {}
}
