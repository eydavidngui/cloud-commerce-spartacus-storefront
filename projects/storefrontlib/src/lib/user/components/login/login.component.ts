import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import * as fromRouting from '../../../routing/store';
import { UserToken } from '../../models/token-types.model';
import * as fromStore from '../../store';

@Component({
  selector: 'y-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  user$: Observable<any> = this.store.select(fromStore.getDetails);
  isLogin = false;

  username: string;
  password: string;
  rememberMe: boolean;

  subscription: Subscription;

  constructor(
    private store: Store<fromStore.UserState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select(fromStore.getUserToken)
      .subscribe((token: UserToken) => {
        if (token && token.access_token && !this.isLogin) {
          this.isLogin = true;
          this.store.dispatch(new fromStore.LoadUserDetails(token.userId));
          this.store.dispatch(new fromStore.Login());
        }
      });
  }

  logout() {
    this.isLogin = false;
    this.store.dispatch(new fromStore.Logout());

    this.store
      .select(fromRouting.getRouterState)
      .pipe(
        filter(routerState => routerState !== undefined),
        take(1)
      )
      .subscribe(storeRouterState => {
        let state = this.route.snapshot;
        while (state.firstChild) {
          state = state.firstChild;
        }
        if (
          state.routeConfig.canActivate &&
          state.routeConfig.canActivate.find(
            child => child.name === 'AuthGuard'
          )
        ) {
          this.store.dispatch(
            new fromRouting.Go({
              path: ['']
            })
          );
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
