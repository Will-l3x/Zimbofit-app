import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories;
  constructor(public categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((res) => {
      console.log(res);
      this.categories = res;
    });
  }
}
