import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuideComponent } from './guide/guide.component';
import {
  NgDashboardModule,
  ConfigurationService,
  UserService,
  NgDashboardPl,
  ModalService,
  RouterService,
  TeamsService,
  InteractiveButtons,
  TokenInterceptor,
  ResponseInterceptor,
  NgDashboardEn,
} from 'projects/core/src/public_api';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleToolbarComponent } from './simple-toolbar/simple-toolbar.component';
import { BugReportComponent } from 'projects/core/src/lib/ng5-basic/components/bug-report/bug-report.component';

import { AppNavigation } from './app.navigation';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { LottieModule } from 'ngx-lottie';

// export function playerFactory() {
//   return import('lottie-web');
// }

@NgModule({
  declarations: [AppComponent, GuideComponent, SimpleToolbarComponent],
  imports: [
    NoopAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    // LottieModule.forRoot({ player: playerFactory }),
    NgDashboardModule.forRoot({
      navbar: {
        search: {},
        notification: true,
        profile: true,
      },
      api: 'http://localhost:1337',
      auth: {
        afterSignupRedirect: '/',
      },
    }),
  ],
  exports: [],
  entryComponents: [SimpleToolbarComponent],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
    },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  public BugReport() {
    this.modal
      .open({
        content: BugReportComponent,
        title: this.config.translate('bug_report_title'),
        type: 'CONFIRMATION',
      })
      .subscribe((result) => {
        console.log(result);
      });
  }

  constructor(
    private config: ConfigurationService,
    private user: UserService,
    private teamsService: TeamsService,
    private modal: ModalService,
    private ngdRouter: RouterService
  ) {
    // this.user.SetUser({
    //   firstname: 'Ali',
    //   lastname: 'Torabi',
    //   email: 'ali.torabi@pixelplux.com',
    // });
    this.config.config.navbar = {
      profile: false,
      notification: true,
    };

    this.config.SetGlobalInteractiveButtons([
      InteractiveButtons.BugReport(() => {}),
      InteractiveButtons.Refresh(() => {}),
    ]);
    this.config.ProvideTranslationForLangauge('en', NgDashboardEn);
    this.config.ProvideTranslationForLangauge('pl', NgDashboardPl);
    this.config.SetLanguage('en');
    this.config.SearchTerms.next([
      {
        title: 'Say hello',
        description: 'Select me, and there will be a hello in console',
        onSelect: () => {
          console.log('Hello!');
        },
        id: '2',
        key: '2',
        keywords: 'Hello, Hi, Hello, Test',
      },
      {
        description: 'Guide about using this dashboard',
        title: 'Guide',
        key: '1',
        id: '1',
        keywords: 'Guide, Guideline, help',
      },
    ]);
    // this.config.Teams.next([
    //   {
    //     members: [],
    //     name: 'Personal team',
    //   },
    //   {
    //     members: [],
    //     name: `Ali's team`,
    //   },
    // ]);
    // this.config.TeamsConfig.next({
    //   manageTeams: true,
    //   manageTeamsText: 'ManageTeams',
    //   onClick: () => {
    //     this.ngdRouter.navigateTo('/teams');
    //   },
    // });

    this.config.DockedMenu.next([
      {
        icon: 'icon-logout',
        title: 'Sign-out',
        onClick: () => {
          this.ngdRouter.navigateTo('/login');
        },
      },
    ]);

    this.config.NavigationItems.next(AppNavigation);
  }
}
