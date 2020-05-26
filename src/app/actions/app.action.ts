export class SetFetchingState {
  static readonly type = '[App] FETCHING';

  constructor(public value: boolean) {
  }
}

export class SetOfflineStatus {
  static readonly type = '[App] OFFLINE STATE';

  constructor(public value: boolean) {
  }
}
