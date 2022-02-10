import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.scss'],
})
export class TrainerProfileComponent implements OnInit {
  @Input() trainer: object;
  @Input() hover: object;
  @Output() clicked = new EventEmitter();
  window = window;
  constructor() {}

  ngOnInit() {}
}
