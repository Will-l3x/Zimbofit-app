import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  @Output() searchText: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  searchTextChanged(e) {
    this.searchText.emit(e.detail.value);
  }
}
