import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {UsersService} from '../services/users.service';
import {MainStore} from '../store';
import {CreateUser, DeleteUser, GetUsers, ModifyUser} from '../actions/users.action';
import {tap} from 'rxjs/operators';
import {insertItem, patch, removeItem, updateItem} from '@ngxs/store/operators';
import {SetFetchingState} from '../actions/app.action';
import {ProfileState} from './profile.state';
import {User} from '../models/user';

@State({
  name: 'users'
})
export class UsersState {

  constructor(private service: UsersService, private store: Store) {
  }

  @Selector()
  static getUsers(state: MainStore) {
    return state.users;
  }

  @Action(GetUsers)
  fetchUsers(ctx: StateContext<MainStore>) {
    this.store.dispatch(new SetFetchingState(true));
    return this.service.getUsers().pipe(
      tap(res => {

        const users = res.filter(user => user.id !== this.store.selectSnapshot(ProfileState.getProfile).id);
        ctx.setState(patch({users}));
        // tap(res => ctx.setState(patch({ users })))
      })
    );
  }

  @Action(CreateUser)
  createUser(ctx: StateContext<MainStore>, {payload}: CreateUser) {
    return this.service.createUser(payload).pipe(
      tap(res => ctx.setState(patch({users: insertItem(res)})))
    );
  }

  @Action(ModifyUser)
  modifyUser(ctx: StateContext<MainStore>, {id, payload}: ModifyUser) {
    return this.service.updateUser(id, payload).pipe(
      tap(res => ctx.setState(patch({users: updateItem(user => user.id === id, res)})))
    );
  }

  @Action(DeleteUser)
  deleteUser(ctx: StateContext<MainStore>, {id}: DeleteUser) {
    return this.service.deleteUser(id).pipe(
      tap(res => ctx.setState(patch({users: removeItem<User>(user => user.id === id)})))
    );
  }
}
