import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { headers } from 'src/app/core/constants/labels';
import { DocumentTypesService } from './services/document-types.service';
import { DocumentTypesModule } from './document-types.module';
import { ModalDeleteComponent } from 'src/app/shared/components/modal-delete/modal-delete.component';
import { ModalInformationComponent } from 'src/app/shared/components/modal-information/modal-information.component';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { Subscription } from 'rxjs';
import { DocumentType } from 'src/app/core/model/document-type';

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
  public data: DocumentType [];
  public columns: string[] = ['name', 'description'];
  public subscriptions = new Subscription();

  constructor(
    public documentTypesService: DocumentTypesService

  ) {}

  ngOnInit(): void {
    this.createGrid();
    this.retrieveReloadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private createGrid(): void {
  this.documentTypesService.search().subscribe((data) => {
    this.data = data;
  });}

  private retrieveReloadData() {
    this.subscriptions.add( this.documentTypesService.getFilteredData().subscribe((data) => {
      this.createGrid();
    }));
  }

}
