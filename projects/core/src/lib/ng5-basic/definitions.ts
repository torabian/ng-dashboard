import { Action as NgrxAction } from '@ngrx/store';
// import { ISearchable } from 'amazing-search';
import { IAuthConfig } from '../auth/definitions';
import { IResponseError } from 'response-type';

export interface Action extends NgrxAction {
  payload: any;
}
export interface IUserForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password2: string;
}

export interface IPermission {
  title: string;
  key: string;
  group: string;
}

export interface IRole {
  id: number;
  title: string;
  permissions: Array<any>;
}

declare global {
  export interface Window {
    io: any;
  }
}

export interface SidebarWidgetItem {
  title?: string;
  value?:
    | string
    | {
        amount: any;
        unit: string;
      };
  icon?: string;
}

/**
 * A place, defines the area of modules and infrustructure
 */
export interface ILocation {
  id: number;
  name: string;
  icon: string;
  temperatureDevice: any;
  level: string;
}

/**
 * Represents the application store structure
 */
export interface AppState {
  roles: Array<IRole>;
  users: Array<IUser>;
  notifications: Array<INotification>;
  activities: Array<IActivity>;
}

export interface Ng5ModuleState {
  ng5: {
    notifications: Array<INotification>;
    activities: Array<IActivity>;
  };
}

/**
 * Occures when a device changes
 */
export enum ActivityTypes {
  DevicePinChange
}
/**
 * This represents if an activity occures in application
 */
export interface IActivity {
  id: number;
  description: string;
  type: ActivityTypes;
  meta: any;
  icon: string;
  iconType: string;
  reason: string;
  time: string;
}

export interface IVPCInformation {
  administrator: string;
  administratorPassword: string;
  vpcname: string;
  vpcregion: string;
}
export interface WorkspaceUser {
  Email: string;
  Name: string;
  LastActivity: string;
  Access: string;
}

/**
 * Represents a change in device data, when happens inside a analog device reader;
 * such as temperature, pressure, and humidity.
 */

export enum TemperatureCustomization {
  SidebarRealTimeValue,
  SidebarLastWeekAverage
}

export interface IDeviceDisplayPreference {
  DisplayRealTimeTemperatureInSidebar?: boolean;
  DisplayLampOnOffInHome?: boolean;
  DisplayHumidityInHome?: boolean;
  DisplayCO2InHome?: boolean;
  DisplayHistoryStatisticsInHome?: boolean;
}

export interface DataSource {
  dataSourceId: string;
  value: any;
  geo?: {
    lat: number;
    lng: number;
  };
  date?: Date;
}

export enum CloudDeviceType {
  TemperatureSensor = 0,
  LampBridge = 1,
  HumiditySensor = 2,
  CO2Sensor = 3
}

export interface CloudDeviceStatistics {
  minimumValue?: number;
  maximumValue?: number;
}
export interface CloudDevice {
  id?: any;
  name?: string;
  datasource?: string;
  type: CloudDeviceType;
  description?: string;
  model?: string;
  location?: any;
  preferences: IDeviceDisplayPreference;
  value?: any;
  dataHistory?: Array<DataSource>;
  statistics?: CloudDeviceStatistics;
}

export interface PagePointerPosition {
  x: number;
  y: number;
}

/**
 * Shows a device usage per month, and it's details.
 */
export interface ICloudDeviceDailyHistory {
  date: Date;
  average: number;
}

export interface INotification {
  title?: string;
  $temp_key?: string;
  id?: string;
  type: 'error' | 'success' | 'info' | 'success';
  icon?: string;
  date: Date;
  tags?: Array<string>;
  message?: string;
  $active?: boolean;
  seen?: boolean;
  target?: 'SELF' | 'TEAM';
  // Import will cause to show a toast as well.
  importance: 'NORMAL' | 'IMPORTANT';
  payload?: any;
}

export interface INotificationEvent {
  type: string;
  payload: any;
}

export interface ISettingsUpdateResponse {
  token: string;
  user: IUser;
}
export interface IContact {
  type: 'email' | 'call' | 'sms';
  value: any;
}

export interface IResetForm {
  password1: string;
  password2: string;
  key: string;
}

export interface INavigation {
  link?: string;
  icon?: string;
  title: string;
  active?: boolean;
  class?: string;
  permissions?: Array<string>;
  $collapsed?: boolean;
  activeMatches?: Array<string>;
  component?: any;
  auth?: boolean;
  focused?: boolean;
  children?: Array<INavigation>;
}
export interface NgBasicConfig {
  navbar?: NavbarConfig;
  navigation?: Array<INavigation>;
  sidebar?: SidebarConfig;
  api?: string;
  github?: boolean;
  auth?: IAuthConfig;
}

export interface SidebarConfig {
  visible: boolean;
}

export interface NavbarConfig {
  notification: boolean;
  profile: boolean;
  title?: string;
  brand?: string;
  avatar?: string;
  search?: {
    terms?: any[];
  };
}

export interface IUser {
  id?: number;
  username?: string;
  email: string;
  avatar?: string;
  preferences?: {
    language?: 'pl' | 'en';
  };
  phone?: string;
  firstname: string;
  lastname: string;
  role?: IRole;
}

export interface InteractiveButton {
  icon?: string;
  title?: string;
  key?: string;
  tooltip?: string;
  onPress?: (InteractiveButton?) => void;
  keyboardShortcut?: string;
}

export interface Team {
  name?: string;
  id?: any;
  owner?: number;
  $selected?: boolean;
  members: Array<IUser>;
  $tooltip?: string;
}

export interface TeamsConfig {
  manageTeams?: boolean;
  tooltip?: string;
  manageTeamsText?: string;
  onClick?: () => void;
}

export interface DockedMenu {
  title?: string;
  icon?: string;
  onClick?: () => void;
}

export interface IWorkingState {
  active: boolean;
  progress?: number;
  mode?: 'COMPLETE' | 'MINOR';
}

export interface IToastMessage {
  message: string;
  type?: 'WARNING' | 'ERROR' | 'SUCCESS' | 'INFO';
  duration?: number;
  title?: string;
  data?: any;
  onClick?: (message: IToastMessage) => void;
}

export interface StartRequestResponse<T> {
  item?: T;
  items?: T[];
  error?: IResponseError;
}

export interface ModalDialog {
  title?: string;
  content?: any;
  type?: 'CONFIRMATION' | 'NOTIFY' | 'YESNO';
}

export interface PageContainerAction {
  title?: string;
  type: 'ICON' | 'BUTTON';
  icon?: string;
  onClick: (params?: any) => void;
}
