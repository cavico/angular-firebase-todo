import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {

  isLoading = false;
  itemForm = new FormGroup({
    uid: new FormControl(''),
    value: new FormControl('', [Validators.required]),
    done: new FormControl(false),
  });

  constructor(
    private itemsService: ItemsService
  ) {}

  async onSubmit() {
    if (this.itemForm.valid) {
      this.isLoading = true;
      await this.itemsService.create(this.itemForm.value);
      this.isLoading = false;
      this.itemForm.reset();
    }
  }
}
