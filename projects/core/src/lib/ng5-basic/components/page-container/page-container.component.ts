import { Component, OnInit, Input } from '@angular/core';
import { PageContainerAction } from '../../definitions';

@Component({
  selector: 'ng-page-container,ng-card-box',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
})
export class PageContainerComponent implements OnInit {
  @Input() public maintitle = '';
  @Input() public subtitle = '';
  @Input() public params = {};
  @Input() public actions: Array<PageContainerAction> = [];
  constructor() {}

  ngOnInit() {}
}
