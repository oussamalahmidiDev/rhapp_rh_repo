export class GetUsersEvenements {
  static readonly type = "[Evenements.utilisateurs] Get";

  constructor(public limit: number) {}
}

export class GetPersonnalEvenements {
  static readonly type = "[Evenements.personnal] Get";

  constructor(public limit: number) {}
}
