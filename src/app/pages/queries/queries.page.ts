import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../services/support.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'queries',
  templateUrl: './queries.page.html',
  styleUrls: ['./queries.page.scss'],
})
export class QueriesPage implements OnInit {
  subscription: Subscription;
  queries: any[];

  constructor(private supportService: SupportService) { }

  ngOnInit() {
    this.subscription = this.supportService.getCurrentUserQueries().subscribe(queries => {
      this.queries = queries;
    });
  }
}
