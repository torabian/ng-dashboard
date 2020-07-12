import { Component } from '@angular/core';
import {
  ConfigurationService,
  ModalService,
  ToastService,
  NgdBaseComponent,
  PageContainerAction,
} from 'projects/core/src/public_api';

@Component({
  selector: 'app-ui-elements',
  templateUrl: './ui-elements.component.html',
  styleUrls: ['./ui-elements.component.scss'],
})
export class UIElementsComponent extends NgdBaseComponent {
  public actions: Array<PageContainerAction> = [
    {
      type: 'ICON',
      icon: 'icon-settings',
      className: 'key-edit-icon',
      onClick: (params) => {
        alert('hi!');
      },
      title: 'Action1',
    },
  ];
  constructor(
    public config: ConfigurationService,
    public modal: ModalService,
    public toast: ToastService
  ) {
    super();
  }
}
