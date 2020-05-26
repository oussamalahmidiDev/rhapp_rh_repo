import {Action, Selector, State, StateContext} from '@ngxs/store';
import {UserService} from '../services/user.service';
import {GetProfile, LoadProfilePhoto, ModifyName, ModifyPhoto, ModifyProfile, UnsetProfile} from '../actions/profile.action';
import {tap} from 'rxjs/operators';
import {MainStore} from '../store';
import {BlobPipe} from '../pipes/blob.pipe';
import {TokenService} from '../services/token.service';


// @ts-ignore
@State<MainStore>({
  name: 'profile'
})
export class ProfileState {

  constructor(private service: UserService, private tokenService: TokenService, private pipe: BlobPipe) {
  }

  @Selector()
  static getProfile(store: MainStore) {
    console.log('GETTING PROFILE');
    return store.profile;
  }


  @Action(GetProfile)
  fetchProfile(ctx: StateContext<MainStore>) {
    return this.service.getCurrentUser().pipe(
      tap(res => ctx.patchState({profile: res})
      ));
  }

  @Action(LoadProfilePhoto)
  fetchProfilePhoto(ctx: StateContext<MainStore>) {
    return this.pipe.transform(ctx.getState().profile.photo).pipe(
      tap(photo => ctx.patchState({profile: {...ctx.getState().profile, photo}}))
    );
  }

  @Action(UnsetProfile)
  unsetProfile(ctx: StateContext<MainStore>) {
    ctx.patchState({profile: null});
  }

  @Action(ModifyName)
  modifyName(ctx: StateContext<MainStore>, {payload}: ModifyName) {
    ctx.patchState({profile: {...ctx.getState().profile, nom: payload}});
  }

  @Action(ModifyProfile)
  modifyProfile(ctx: StateContext<MainStore>, {payload}: ModifyProfile) {
    return this.service.modifierProfile(payload).pipe(
      tap(res => {
        if (res.email !== ctx.getState().profile.email) {
          this.tokenService.setNewToken(res.token);
        }
        ctx.patchState({profile: res});
      })
    );
  }

  @Action(ModifyPhoto)
  modifyPhoto(ctx: StateContext<MainStore>, {payload}: ModifyPhoto) {
    ctx.patchState({profile: payload});
  }

}
