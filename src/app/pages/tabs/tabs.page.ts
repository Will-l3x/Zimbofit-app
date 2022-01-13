import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
      const selected = document.querySelector('.selected');
      selected.classList.remove('text-orange-600');
      selected.classList.add(
        'from-orange-600',
        'to-orange-500',
        'bg-gradient-to-r',
        'text-white'
      );
  }

}
