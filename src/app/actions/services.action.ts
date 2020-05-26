import {Service} from '../models/service';

export class GetServices {
  static readonly type = '[Services] Get';
}

export class AddService {
  static readonly type = '[Services] CREATE';

  constructor(public payload: Service) {
  }
}
