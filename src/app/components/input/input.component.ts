import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() type: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Output() textChanged: EventEmitter<string> = new EventEmitter();
  text = '';
  constructor() {}

  ngOnInit() {}
  inputChanged() {
    this.textChanged.emit(this.text);
  }
}
