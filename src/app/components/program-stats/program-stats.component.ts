import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Program } from 'src/app/interfaces/program.model';

@Component({
  selector: 'app-program-stats',
  templateUrl: './program-stats.component.html',
  styleUrls: ['./program-stats.component.scss'],
})
export class ProgramStatsComponent {
  @Input() item: Program;
  @Output() clicked = new EventEmitter();
}
