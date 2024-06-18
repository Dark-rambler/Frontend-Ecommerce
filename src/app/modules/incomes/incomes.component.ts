import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { headers } from 'src/app/core/constants/labels';
import { Subscription } from 'rxjs';
import { IncomesService } from './services/incomes.service';
import { IncomesModule } from './incomes.module';
import { ModalDeleteComponent } from 'src/app/shared/components/modal-delete/modal-delete.component';
import { ModalInformationComponent } from 'src/app/shared/components/modal-information/modal-information.component';
import { HelpersService } from 'src/app/core/services/helpers.service';

@Component({
  selector: 'app-incomes',
  standalone: true,
  imports: [CommonModule, IncomesModule, ModalDeleteComponent, ModalInformationComponent],
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss'],
  providers: [HelpersService]
})
export default class IncomesComponent {
  public headers = headers;
  public data: any;
  public columns: string[] = ['name', 'description', 'amount','documenType', 'date'];
  public subcxriptions = new Subscription();

  constructor(
    public incomesService: IncomesService
  ) {}

  ngOnInit(): void {
    this.createGrid();
    this.retrieveReloadData();
  }

  ngOnDestroy(): void {
    this.subcxriptions.unsubscribe();
  }
  private createGrid(): void {
  this.incomesService.findAll().subscribe((data) => {
    this.data = data;
  });}

  private retrieveReloadData() {
    this.subcxriptions.add( this.incomesService.getFilteredData().subscribe((data) => {
      this.createGrid();
    })
    );
  }
}
