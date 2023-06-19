import { Component, Input } from '@angular/core';
import { Run } from '../interfaces/run';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.css']
})
export class RunComponent {
  @Input() runData: Run = {} as Run;
}
