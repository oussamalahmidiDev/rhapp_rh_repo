import {User} from '../models/user';

export class GetUsers {
  static readonly type = '[Users] Get';
}

export class CreateUser {
  static readonly type = '[Users] Create';

  constructor(public payload: User) {
  }
}

export class ModifyUser {
  static readonly type = '[Users] Modify';

  constructor(public id: number, public payload: User) {
  }
}

export class DeleteUser {
  static readonly type = '[Users] Delete';

  constructor(public id: number) {
  }
}
