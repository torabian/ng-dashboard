import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  HostListener,
  ElementRef,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser, Team } from '../../definitions';
import { RouterService } from '../../services/router.service';
import { Subscription } from 'rxjs';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'ng-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit, OnDestroy {
  public teams: Array<Team> = [];
  public teamsSubscription: Subscription;
  public dropDownVisible = false;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropDownVisible = false;
    }
  }

  public display = '';
  constructor(
    public user: UserService,
    public ngdRouter: RouterService,
    private config: ConfigurationService,
    private eRef: ElementRef
  ) {}

  ngOnInit() {
    this.teamsSubscription = this.config.Teams.subscribe(
      (teams) => (this.teams = teams)
    );
  }

  ngOnDestroy() {
    if (this.teamsSubscription) {
      this.teamsSubscription.unsubscribe();
    }
  }

  public toggleMenu(): void {
    this.dropDownVisible = !this.dropDownVisible;
  }

  public name(user: IUser) {
    if (user.firstname) {
      return `${user.firstname.substr(0, 10)}`;
    }
    if (user.lastname) {
      return `${user.lastname.substr(0, 2)}`;
    }
    return user.email.substr(0, 2);
  }

  public get label() {
    if (!this.teams || this.teams.length === 0) {
      return null;
    }
    const selected = this.teams.find((team) => team.$selected);

    if (!selected) {
      return this.formatLabel(this.teams[0]);
    }
    return this.formatLabel(selected);
  }

  public formatLabel(team: Team) {
    return team.name;
  }

  public selectTeam(team: Team) {
    this.config.SelectedTeam.next(team);
  }
}
