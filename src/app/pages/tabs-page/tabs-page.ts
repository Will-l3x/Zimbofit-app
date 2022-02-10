import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tabs-page',
  templateUrl: 'tabs-page.html',
  styleUrls: ['tabs-page.scss'],
})
export class TabsPage implements OnInit {
  user: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user) => (this.user = user));
  }
}
