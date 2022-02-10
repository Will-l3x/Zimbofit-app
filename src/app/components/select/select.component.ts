import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() countries: any;
  @Input() placeholder: string;
  @Output() optionChanged: EventEmitter<string> = new EventEmitter();
  option = '';
  constructor() {}

  ngOnInit() {}

  inputChanged() {
    this.optionChanged.emit(this.option);
  }
}
