import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParallaxDirective } from './parallax.directive';
import { HideHeaderDirective } from './hide-header.directive';
import { BackbuttonDirective } from './backbutton.directive';

@NgModule({
  declarations: [ParallaxDirective, HideHeaderDirective, BackbuttonDirective],
  imports: [CommonModule],
  exports: [ParallaxDirective, HideHeaderDirective, BackbuttonDirective],
})
export class SharedDirectivesModule {}
