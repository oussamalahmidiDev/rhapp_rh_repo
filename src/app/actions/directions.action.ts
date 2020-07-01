import {Direction} from '../models/direction';

export class GetDirections {
  static readonly type = '[Directions] Get';
}

export class AddDirection {
  static readonly type = '[Directions] CREATE';

  constructor(public payload: Direction) {
  }
}
