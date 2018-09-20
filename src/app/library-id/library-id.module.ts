import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LibraryIdComponent} from './library-id-component/library-id.component';
import {Route, RouterModule} from '@angular/router';
import {MaterialModule} from '../material/material.module';
import {NgxBarcodeModule } from 'ngx-barcode';

const routes: Route[] = [
  {path: '', component: LibraryIdComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    NgxBarcodeModule
  ],
  declarations: [LibraryIdComponent]
})
export class LibraryIdModule {
}
