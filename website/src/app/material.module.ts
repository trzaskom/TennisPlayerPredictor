import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatPaginator } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule
  ],
})

export class MaterialModule { }
