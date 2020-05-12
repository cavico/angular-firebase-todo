import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/common/interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  items$;

  constructor(private itemsService: ItemsService) {
    this.itemsService.list().subscribe((value) => (this.items$ = value));
  }

  delete(item) {
    this.itemsService.delete(item);
  }

  update(event, item) {
    const value = {
      done: event.target.checked
    };
    this.itemsService.update(item, value);
  }
}
