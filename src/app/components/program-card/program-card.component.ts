import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Program } from 'src/app/interfaces/program.model';

@Component({
  selector: 'app-program-card',
  templateUrl: './program-card.component.html',
  styleUrls: ['./program-card.component.scss'],
})
export class ProgramCardComponent {
  @Input() item: Program;
  @Output() clicked = new EventEmitter();
}
