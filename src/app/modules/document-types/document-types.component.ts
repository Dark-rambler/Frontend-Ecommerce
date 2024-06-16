import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { headers } from 'src/app/core/constants/labels';
import { DocumentTypesService } from './services/document-types.service';
import { DocumentTypesModule } from './document-types.module';
import { ModalDeleteComponent } from 'src/app/shared/components/modal-delete/modal-delete.component';
import { ModalInformationComponent } from 'src/app/shared/components/modal-information/modal-information.component';
import { HelpersService } from 'src/app/core/services/helpers.service';

@Component({
  selector: 'app-document-types',
  standalone: true,
  imports: [DocumentTypesModule, ModalInformationComponent, ModalDeleteComponent],
  templateUrl: './document-types.component.html',
  styleUrls: ['./document-types.component.scss'],
  providers: [HelpersService]
})
export default class DocumentTypesComponent {
  public headers = headers;
  public data: any;
  public columns: string[] = ['name', 'description'];


  constructor(
    public documentTypesService: DocumentTypesService

  ) {}

  ngOnInit(): void {
    this.createGrid();
    this.retrieveReloadData();
  }
  private createGrid(): void {
  this.documentTypesService.findAll().subscribe((data) => {
    this.data = data;
  });}

  private retrieveReloadData() {
    this.documentTypesService.getFilteredData().subscribe((data) => {
      this.createGrid();
    }
    );
  }

}
