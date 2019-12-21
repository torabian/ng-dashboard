import { Injectable } from '@angular/core';
import {
  ILocation,
  IUser,
  ISettingsUpdateResponse,
  IContact
} from '../definitions';
import { HttpClient } from '@angular/common/http';
import { IResponse } from 'response-type';
import { GetNetworkError } from './common';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class RequestsService {
  constructor(private http: HttpClient, private config: ConfigurationService) {}

  public async GetContactDetails(): Promise<IResponse<IContact>> {
    const url = this.config.API('/api/contact-details');
    const ref = this.http.get(url).toPromise();
    try {
      const response: IResponse<IContact> = await ref;
      return response;
    } catch (error) {
      if (error.name === 'HttpErrorResponse') {
        return GetNetworkError();
      }
      return error;
    }
  }

  public async UpdateUserProfile(
    user: IUser
  ): Promise<IResponse<ISettingsUpdateResponse>> {
    const ref = this.http
      .post(this.config.API('/api/user/settings'), user)
      .toPromise();
    try {
      const response: IResponse<ISettingsUpdateResponse> = await ref;
      return response;
    } catch (error) {
      if (error.name === 'HttpErrorResponse') {
        return GetNetworkError();
      }
      return error;
    }
  }
  public async UpdateContactDetails(
    contacts: Array<IContact>
  ): Promise<IResponse<any>> {
    const ref = this.http
      .post(this.config.API('/api/contact-details'), { contacts })
      .toPromise();
    try {
      const response: IResponse<any> = await ref;
      return response;
    } catch (error) {
      if (error.name === 'HttpErrorResponse') {
        return GetNetworkError();
      }
      return error;
    }
  }

  public async RequestPasswordReset(
    username: string
  ): Promise<IResponse<ILocation>> {
    const ref = this.http
      .post(this.config.API('/api/forget-password'), { username })
      .toPromise();
    try {
      const response: IResponse<ILocation> = await ref;
      return response;
    } catch (error) {
      if (error.name === 'HttpErrorResponse') {
        return GetNetworkError();
      }
      return error;
    }
  }
}
