import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { headers } from 'src/app/core/constants/labels';
import { DocumentTypesService } from './services/document-types.service';
import { DocumentTypesModule } from './document-types.module';

@Component({
  selector: 'app-document-types',
  standalone: true,
  imports: [DocumentTypesModule],
  templateUrl: './document-types.component.html',
  styleUrls: ['./document-types.component.scss']
})
export default class DocumentTypesComponent {
  public headers = headers;
  public data: any;
  public columns: string[] = ['name', 'description', 'amount', 'date'];


  constructor(
    public documentTypesService: DocumentTypesService

  ) {}

  ngOnInit(): void {
    this.createGrid();
  }
  private createGrid(): void {
  this.documentTypesService.findAll().subscribe((data) => {
    this.data = data;
  });}



}
