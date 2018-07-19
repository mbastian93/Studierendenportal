import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule, MatBottomSheetModule,
  MatButtonModule,
  MatCardModule, MatChipsModule, MatDividerModule,
  MatExpansionModule, MatIconModule,
  MatInputModule,
  MatListModule, MatSelectModule, MatSidenavModule,
  MatTableModule, MatTabsModule, MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatSelectModule,
    MatChipsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatSidenavModule
  ],
  exports: [
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatSelectModule,
    MatChipsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatSidenavModule
  ],
  declarations: []
})
export class MaterialModule { }
