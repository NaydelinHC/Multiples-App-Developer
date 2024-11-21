import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userNumber: number = 0;
  numbers: number[] = [];
  divisors: number[] = [3, 5, 7];
  loading: boolean = false;

  constructor(private firestore: Firestore) {}

  // Encuentra los múltiplos basados en el número ingresado
  findMultiples() {
    if (isNaN(this.userNumber)) {
      alert('Por favor, ingresa un número válido.');
      return;
    }

    // Validación para numeros decimales menores a 0
    if (String(this.userNumber).startsWith('.') || String(this.userNumber).startsWith('-.') || this.userNumber < 1) {
      alert('No se puede calcular números decimales menores a 0.');
      return;
    }

    this.loading = true;

    // Genera las listas y las guarda en la bd
    this.numbers = this.generateNumberList(this.userNumber);
    this.saveToFirestore(this.userNumber, this.numbers).then(() => {
      this.loading = false;
    });
  }

  // Genera una lista de números hasta el número ingresado
  generateNumberList(userNumber: number): number[] {
    if (userNumber === 0) {
      return [0];
    } else if (userNumber > 0) {
      return Array.from({ length: userNumber + 1 }, (_, i) => i);
    } else {
      return Array.from({ length: Math.abs(userNumber) + 1 }, (_, i) => userNumber + i);
    }
  }

  // Devuelve el color de acuerdo al múltiplo del divisor 
  getColor(number: number): string {
    if (number % 3 === 0) {
      return 'green';
    } else if (number % 5 === 0) {
      return 'red';
    } else if (number % 7 === 0) {
      return 'blue';
    }
    return 'black';
  }

  // Guarda los datos en la bd
  async saveToFirestore(userNumber: number, result: number[]) {
    try {
      const docRef = await addDoc(collection(this.firestore, 'calculations'), {
        input: userNumber,
        result: result,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
}