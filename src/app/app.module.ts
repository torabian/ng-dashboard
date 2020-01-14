import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuideComponent } from './guide/guide.component';
import {
  NgDashboardModule,
  ConfigurationService,
  NgDashboardEn,
  UserService
} from 'projects/core/src/public_api';
import { Router } from '@angular/router';

@NgModule({
  declarations: [AppComponent, GuideComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgDashboardModule.forRoot({
      navbar: {
        search: {
          terms: []
        },
        notification: true,
        profile: true
      },
      api: 'http://localhost:1337',
      navigation: [
        {
          title: 'Auth',
          children: [
            {
              title: 'Login',
              link: '/login'
            }
          ]
        }
      ],
      auth: {
        afterSignupRedirect: '/'
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private config: ConfigurationService,
    private user: UserService,
    private router: Router
  ) {
    this.user.SetUser({
      firstname: 'Ali',
      lastname: 'Torabi',
      email: 'ali.torabi@pixelplux.com'
    });
    this.config.config.navbar = {
      profile: false,
      notification: true
    };
    this.config.SetInteractiveButtons([
      {
        icon: 'icon-info',
        title: 'info',
        key: 'info_btn',
        onPress: () => {
          alert(
            'Wow! You are now using interactive buttons! see app.module.ts for more info'
          );
        },
        keyboardShortcut: 'Enter'
      }
    ]);
    this.config.translationsDictionary = NgDashboardEn;
    this.config.language.next('en');
    this.config.SelectedTeam.subscribe(team => {
      console.log('User new team', team);
    });
    this.config.Teams.next([
      {
        members: [],
        name: 'Personal team'
      },
      {
        members: [],
        name: `Ali's team`
      }
    ]);
    this.config.TeamsConfig.next({
      manageTeams: true,
      manageTeamsText: 'ManageTeams',
      onClick: () => {
        this.router.navigateByUrl('/teams');
      }
    });
  }
}
