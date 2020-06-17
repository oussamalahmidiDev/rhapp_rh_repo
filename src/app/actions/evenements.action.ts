import { Activity } from "../models/activity";

export class GetUsersEvenements {
  static readonly type = "[Evenements.utilisateurs] Get";

  constructor(public limit: number) {}
}

export class GetPersonnalEvenements {
  static readonly type = "[Evenements.personnal] Get";

  constructor(public limit: number) {}
}

export class AddUsersEvenement {
  static readonly type = "[Evenements.utilisateurs] Add";

  constructor(public payload: Activity) {}
}
