import { FormControl, FormGroup, Validators } from "@angular/forms"

export class FormUtils {
  static getDefaultProductFromgroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', ),
      price: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      inventory : new FormControl('', [Validators.required]),
    });
  }

}
