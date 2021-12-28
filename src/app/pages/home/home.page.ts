import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { TrainerService } from '../../services/trainer.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [CategoryService, TrainerService],
})
export class HomePage implements OnInit {
  numoftrainers;
  categories;
  trainers;

  constructor(
    public categoryService: CategoryService,
    public trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res) => {
      console.log(res);
      this.categories = res;
    });

    this.trainerService.getTrainers().subscribe((res) => {
      console.log(res);
      this.numoftrainers = res.length;
      this.trainers = res;
    });

    const animation = (animeClass, anime) => {
      const callback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(anime);
          } else {
            entry.target.classList.remove(anime);
          }
        });
      };

      const observer = new IntersectionObserver(callback);

      const targets = document.querySelectorAll(animeClass);
      targets.forEach((target) => {
        target.classList.add('opacity-0');
        observer.observe(target);
      });
    };
    animation('.js-show-on-scroll', 'animate-fadeIn');
    animation('.fadeInTop', 'animate-fadeInTop');
    animation('.fadeInRight', 'animate-fadeInRight');
    animation('.fadeInBottom', 'animate-fadeInBottom');
    animation('.fadeInLeft', 'animate-fadeInLeft');

    const scrollToSection = (navClass) => {
      const targets = document.querySelectorAll(navClass);

      targets.forEach((target) => {
        target.addEventListener('click', (e) => {
          e.preventDefault();
          console.log(e);
          const section = e.target.attributes['data-target'].nodeValue;
          console.log(section);
          const element = document.getElementById(section);
          element.scrollIntoView();
        });
      });
    };

    scrollToSection('.nav');
  }

  toggleMenu = () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
  };
}
