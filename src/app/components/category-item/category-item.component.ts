/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, Input } from '@angular/core';
import { Category } from 'src/app/interfaces/category.model';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent {
  @Input() item: Category;
}
