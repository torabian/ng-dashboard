import {
  TeamNavigation,
  INavigation,
  UserNavigation,
  AccessTokenNavigation,
} from 'projects/core/src/public_api';

export const AppNavigation: INavigation[] = [
  {
    title: 'Getting Started',
    activeMatches: ['^/$'],
    children: [
      {
        title: 'Installing ng-dashboard',
        link: '/',
      },
      {
        title: 'Modals and pickers',
        link: '/modals',
        activeMatches: ['^/modals$'],
      },
      {
        title: 'Toast',
        link: '/toast',
        activeMatches: ['^/toast$'],
      },
      {
        title: 'UI Elements',
        link: '/ui-elements',
        activeMatches: ['^/ui-elements$'],
      },
    ],
  },
  {
    title: 'Authentications (Public)',
    children: [
      {
        title: 'Login',
        link: '/login',
        activeMatches: ['/login'],
        type: 'PUBLIC',
      },
      {
        title: 'Signup',
        link: '/signup',
        activeMatches: ['/signup'],
        type: 'PUBLIC',
      },
      {
        title: 'Reset password',
        link: '/reset-password',
        activeMatches: ['/reset-password'],
        type: 'PUBLIC',
      },
      {
        title: 'Forgot password',
        link: '/forgot-password',
        activeMatches: ['/forgot-password'],
        type: 'PUBLIC',
      },
    ],
  },
  ...TeamNavigation,
  ...UserNavigation,
  ...AccessTokenNavigation,
  {
    type: 'AngularRouter',
    title: 'Developer',
    permissions: ['DEVELOPER'],
    link: '/developer',
  },
];
