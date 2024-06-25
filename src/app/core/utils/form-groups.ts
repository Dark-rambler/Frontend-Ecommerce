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

  static getDefaultExpenseFormGroup():FormGroup{
    return new FormGroup({
      id: new FormControl(''),
      socialReason: new FormControl('', [Validators.required]),
      documentNumber: new FormControl('', [Validators.required]),
      description: new FormControl('', ),
      amount: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      documentTypeId : new FormControl('', [Validators.required]),
    })
  }

  static getDefaultDocumentTypeFormGroup():FormGroup{
    return new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', ),
    })
  }

  static getDefaultIncomeFormGroup():FormGroup{
    return new FormGroup({
      id: new FormControl(''),
      socialReason: new FormControl('', [Validators.required]),
      documentNumber: new FormControl('', [Validators.required]),
      description: new FormControl('', ),
      amount: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      documentTypeId : new FormControl('', [Validators.required]),
    })
  }

  static getDefaultFormFilter():FormGroup{
    return new FormGroup({
      dateRange: new FormControl(''),
    })
  }

}
