import { Component, OnInit, HostListener } from '@angular/core';
import { INotification, Ng5ModuleState } from '../../definitions';

@Component({
  selector: 'ng-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  public notificationStatus = false;
  public searchStatus = false;
  public notifications: Array<INotification> = [];
  public notificationsBackup: Array<INotification> = [];

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.notificationStatus) {
      const path =
        event.path ||
        (event.composedPath && event.composedPath()) ||
        this.composedPath(event.target);
      const isTarget = path.filter(
        x => x.id === 'notification-list' || x.id === 'notification-button'
      );
      if (isTarget.length === 0) {
        this.ToggleNotification();
      }
    }
  }
  constructor() {}

  ngOnInit() {
    // this.store.select('ng5').subscribe(({ notifications }) => {
    //   this.notifications = notifications;
    //   this.notificationsBackup = notifications;
    // });
  }

  ToggleNotification() {
    this.notificationStatus = this.notificationStatus ? false : true;
  }

  ToggleSearch() {
    this.searchStatus = this.searchStatus ? false : true;
  }

  filterNotifications(value) {
    const filtered = this.notificationsBackup.filter(
      x => x.message.indexOf(value) > -1 || x.title.indexOf(value) > -1
    );
    this.notifications = filtered.length ? filtered : this.notificationsBackup;
  }

  composedPath(el) {
    const path = [];
    while (el) {
      path.push(el);
      if (el.tagName === 'HTML') {
        path.push(document);
        path.push(window);
        return path;
      }
      el = el.parentElement;
    }
  }
}
