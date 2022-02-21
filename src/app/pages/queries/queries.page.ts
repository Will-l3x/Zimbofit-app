/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../services/support.service';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'queries',
  templateUrl: './queries.page.html',
  styleUrls: ['./queries.page.scss'],
})
export class QueriesPage implements OnInit {
  subscription: Subscription;
  queries: any[];
  page = 'Queries';
  appPages = [
    {
      title: 'Dashboard',
      url: '/app/tabs/start',
      icon: 'play',
      requiresUser: true,
    },
    {
      title: 'Programs',
      url: '/app/tabs/programs',
      icon: 'fitness',
      count: 0,
    },
    {
      title: 'Workouts',
      url: '/app/tabs/workouts',
      icon: 'fitness',
      count: 0,
    },
    {
      title: 'Exercises',
      url: '/app/tabs/exercises',
      icon: 'fitness',
      count: 0,
    },
    {
      title: 'Categories',
      url: '/app/tabs/categories',
      icon: 'unlock',
      count: 0,
    },
    {
      title: 'Trainers',
      url: '/app/tabs/trainers',
      icon: 'unlock',
      count: 0,
    },

    {
      title: 'Schedules',
      url: '/app/tabs/schedule',
      icon: 'calendar',
    },
    {
      title: 'Speakers',
      url: '/app/tabs/speakers',
      icon: 'contacts',
    },
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map',
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle',
    },
  ];

  constructor(
    private supportService: SupportService,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.subscription = this.supportService
      .getCurrentUserQueries()
      .subscribe((queries) => {
        this.queries = queries;
      });
  }
  sidenavOpen() {
    this.menu.enable(true, 'menu-content-queries');
    this.menu.open('menu-content-queries');
  }
}
