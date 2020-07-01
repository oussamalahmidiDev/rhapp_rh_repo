import {User} from './user';

export interface Activity {
  id?: number;
  evenement: string;
  service: string;
  timestamp: Date;
  user: User;
}
