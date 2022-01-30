import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.scss'],
})
export class MenuIconComponent {
  @Output() clicked = new EventEmitter();
}
