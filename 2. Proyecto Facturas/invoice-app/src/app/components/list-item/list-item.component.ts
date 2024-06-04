import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Item } from '../../models/item';
import { RowItemComponent } from '../row-item/row-item.component';


@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [RowItemComponent],
  templateUrl: './list-item.component.html'
})
export class ListItemComponent {

  @Input() items: Item[]  = [];

  @Output() removeEventEmitter: EventEmitter<number> = new EventEmitter();

  onRemove(id:number){
    this.removeEventEmitter.emit(id);
  }

}
