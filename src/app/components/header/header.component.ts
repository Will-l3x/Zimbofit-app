import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Grab HTML Elements
    const btn = document.querySelector('button.mobile-menu-button');
    const menu = document.querySelector('.mobile-menu');

    // Add Event Listeners
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    // window.onscroll = () => {
    //   const sc = window.pageYOffset;
    //   const header = document.getElementById('header');
    //   if (sc > 100) {
    //     header.classList.add('small-header-class');
    //   } else {
    //     header.classList.remove('small-header-class');
    //   }
    // };
  }

}
