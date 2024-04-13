import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { tittles } from 'src/app/core/constants/labels';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

    public tittles = tittles;
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Delete',
                icon: 'pi pi-times'
            }
        ];
    }

    public save() {
        console.log('save');
    }
    public edit() {
        console.log('edit');
    }
    public delete() {
        console.log('delete');
    }
    public info() {
        console.log('update');
    }
}
