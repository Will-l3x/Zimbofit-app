import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  @Input() targetId: string;
  @Input() type: string;

  constructor() { }

  ngOnInit() {}

  onShare() {

  }

}
