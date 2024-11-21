import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  numero: number = 0; // Propiedad 'numero' para enlazar con ngModel
  resultados: { numero: number, multiplos: number[], color: string }[] = []; // Propiedad 'resultados'

  // Método que se ejecuta al hacer clic en el botón
  procesarNumero() {
    if (isNaN(this.numero)) {
      alert('Por favor, ingresa un número válido.');
      return;
    }

    // Generar los múltiplos
    this.resultados = this.generarMultiples(this.numero);
  }

  // Método que genera los múltiplos de 3, 5 y 7
  generarMultiples(num: number) {
    const divisores = [3, 5, 7];
    let multiplos = [];
    
    for (let i = 1; i <= num; i++) {
      let multiplesDeDivisores = divisores.filter(d => i % d === 0);
      if (multiplesDeDivisores.length > 0) {
        multiplos.push({
          numero: i,
          multiplos: multiplesDeDivisores,
          color: this.obtenerColor(i),
        });
      }
    }
    return multiplos;
  }

  // Método que devuelve el color según el múltiplo
  obtenerColor(num: number) {
    if (num % 3 === 0) return 'green';
    if (num % 5 === 0) return 'red';
    if (num % 7 === 0) return 'blue';
    return 'black';
  }
}
