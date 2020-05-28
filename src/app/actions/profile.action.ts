import {User} from '../models/user';

export class GetProfile {
  static readonly type = '[Profile] Get';
}

export class LoadProfilePhoto {
  static readonly type = '[Profile] Get PHOTO';
}

export class ModifyProfile {
  static readonly type = '[Profile] UPDATE';

  constructor(public payload: User) {
  }
}

export class ModifyName {
  static readonly type = '[Profile] UPDATE NAME';

  constructor(public payload: string) {
  }
}

export class ModifyPhoto {
  static readonly type = '[Profile] UPDATE PHOTO';

  constructor(public payload: User) {
  }
}

export class UnsetPhoto {
  static readonly type = '[Profile] DELETE PHOTO';
}

export class UnsetProfile {
  static readonly type = '[Profile] UNSET';
}

