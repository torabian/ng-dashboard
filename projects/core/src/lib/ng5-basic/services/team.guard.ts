import { Injectable } from '@angular/core';
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

import { TeamsService } from './teams.service';
const TEAM_ID_INPATH_REGEX = /^\/([0-9]+)\/?(.+)?/;

@Injectable()
export class TeamGuardAuth implements CanActivate {
  constructor(private teams: TeamsService) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const path = state.url;

    // If there is a team in url, we should change it.
    const match = path.match(TEAM_ID_INPATH_REGEX);

    if (!match) {
      return true;
    }
    const team = +match[1];
    if (team && !isNaN(team)) {
      this.teams.SelectTeam(team);
    }

    return true;
  }
}
