import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RatingModule } from '../rating/rating.module';
import { ProgramCardComponent } from './program-card.component';

@NgModule({
    declarations: [ProgramCardComponent],
    imports: [CommonModule, IonicModule, RatingModule],
    exports: [ProgramCardComponent],
    providers:[],
})

export class ProgramCardModule {}
