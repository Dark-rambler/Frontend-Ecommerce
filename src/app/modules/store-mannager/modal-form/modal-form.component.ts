import { Component } from '@angular/core';
import { StoreMannagerService } from '../services/store-mannager.service';
import { buttons, labels, tittles } from 'src/app/core/constants/labels';
import { FormGroup } from '@angular/forms';
import { FormUtils } from 'src/app/core/utils/form-groups';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent {

  public tittles =tittles;
  public buttons = buttons;
  public labels = labels;
  public visible: boolean;
  public tittleForm: string;
  public submited: boolean;
  public formProduct: FormGroup;

  constructor(private storeMannagerService: StoreMannagerService) { }

  ngOnInit(): void {
    this.initializeListenners()
    this.initializeValues()
  }
  public openCreate() {
    this.visible = true;
    this.tittleForm = this.tittles.CreateProduct;
  }

  public openEdit() {
    this.visible = true;
    this.tittleForm = this.tittles.UpdateProduct;
  }

  public close() {
    this.visible = false;
  }

  public save() {
    this.submited = true;
    if (this.formProduct.valid) {
      console.log(this.formProduct.value);
      this.close();
    }
  }

  private initializeValues() {
    this.visible = true;
    this.submited = false;
    this.formProduct = FormUtils.getDefaultProductFromgroup();
  }

  private initializeListenners() {
    this.storeMannagerService.trigger.emit(this)
    this.storeMannagerService.getSelectedData().subscribe((product) => {
      if (product) {
        this.formProduct.patchValue(product);
      }
    });
  }

}
