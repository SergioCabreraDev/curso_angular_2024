import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { invoiceData } from '../data/invoice.data';
import { Item } from '../models/item';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

// Importamos o definimos el tipo `Invoice` y el objeto `invoiceData` el modelo de datos inicial.
// Se asigna `invoiceData` al objeto `invoice` mediante la inicialización del constructor.
private invoice: Invoice = invoiceData;

// Constructor de la clase
constructor() { }

// Método para obtener la factura
getInvoice(): Invoice {
  // Calculamos el total de la factura
  const total = this.calcularTotal();
  // Devolvemos una copia de la factura original con el total recalculado
  return {...this.invoice, total: total};
}

// Método para eliminar un elemento de la factura por su ID
remove(id: number): Invoice {
  // Filtramos los elementos de la factura para eliminar el elemento con el ID especificado
  this.invoice.items = this.invoice.items.filter(item => item.id != id);
  // Calculamos el total de la factura después de la eliminación
  const total = this.calcularTotal();
  // Devolvemos una copia de la factura actualizada con el total recalculado
  return {...this.invoice, total: total};
}

save(item: Item): Invoice{
  this.invoice.items = [... this.invoice.items, item];
  // Calculamos el total de la factura después de la eliminación
  const total = this.calcularTotal();
  // Devolvemos una copia de la factura actualizada con el total recalculado
  return {...this.invoice, total: total};
}  


// Método para calcular el total de la factura
calcularTotal() {
  // Usamos el método `reduce` para sumar el precio total de todos los elementos en la factura
  return this.invoice.items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

}
