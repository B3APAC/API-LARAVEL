import { Component } from '@angular/core';

@Component({
  selector: 'app-factoriel',
  templateUrl: './factoriel.component.html',
  styleUrls: ['./factoriel.component.css']
})
export class FactorielComponent {

  calculerFactorielle(n: number): number {
    if (n === 0) {
      return 1; // Cas de base : la factorielle de 0 est 1
    } else {
      return n * this.calculerFactorielle(n - 1); // Appel récursif
    }
  }
}
  

