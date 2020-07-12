import { IResponse } from 'response-type';
import { FormGroup, FormControl } from '@angular/forms';

import { NgdBaseComponent } from '../ng5-basic/services/ngd-base.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthPublicService, AuthEvent } from './auth-public.service';
import { ConfigurationService } from '../ng5-basic/services/configuration.service';
import { UserService } from '../ng5-basic/services/user.service';
import { debounceTime, timeout } from 'rxjs/operators';
import { RouterService } from '../ng5-basic/services/router.service';

export class AuthCommonComponent extends NgdBaseComponent {
  public userForm = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null),
  });

  public response: IResponse<any> = null;

  constructor(
    public http: HttpClient,
    public router: Router,
    public ngdRouter: RouterService,
    public auth: AuthPublicService,
    public config: ConfigurationService,
    public user: UserService
  ) {
    super();
  }

  async post(api: string, data: any = {}) {
    console.log(api);
    return await this.StartSingleRequest(() =>
      this.http
        .post(this.config.API(api), data)
        .pipe(debounceTime(500), timeout(3000))
        .toPromise()
    );
  }

  async signup() {
    const res = await this.post('/api/user/signup', this.userForm.value);

    if (res.item) {
      this.onSignupSuccessed(res.item);
    }
  }

  async login() {
    const res = await this.post('/api/user/signin', this.userForm.value);

    if (res.item) {
      this.onLoginSuccessed(res.item);
    }
  }

  private onLoginSuccessed(result) {
    this.auth.events.emit({
      payload: result,
      type: AuthEvent.LOGIN_SUCCESS,
    });
    this.user.SetToken(result.token);
    this.user.SetUser(result.user);
  }

  private onSignupSuccessed(result) {
    this.user.SetToken(result.token);
    this.user.SetUser(result.user);

    if (this.config.Config.onSignupSuccess) {
      this.config.Config.onSignupSuccess(result);
    }

    this.auth.events.emit({
      type: AuthEvent.SIGNUP_SUCCESS,
      payload: result,
    });

    if (this.config.Config.afterSignupRedirect) {
      this.ngdRouter.navigateTo(this.config.Config.afterSignupRedirect);
    }
  }

  /**
   * Removes every reference to the user
   */
  public LogoutUser() {
    this.user.SetToken(null);
    this.user.SetUser(null);
    this.config.Notifications.next([]);

    this.auth.events.emit({
      type: AuthEvent.REVOKE,
    });
  }
}
