import { User } from './user';

export interface Notification {
      id: number;
      content: string;
      isSeen: boolean;
      from: User;
}