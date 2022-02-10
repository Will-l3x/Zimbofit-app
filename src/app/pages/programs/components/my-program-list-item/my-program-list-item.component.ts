/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'my-program-list-item',
  templateUrl: './my-program-list-item.component.html',
  styleUrls: ['./my-program-list-item.component.scss'],
})
export class MyProgramListItemComponent implements OnInit {
  @Input() program: any;
  @Output() clicked = new EventEmitter();
  imageUrl: string;
  constructor() {}

  ngOnInit() {
    this.imageUrl = this.program.image_url
      ? this.program.image_url
      : 'assets/img/products/advance-card-bttf.png';
  }
}
