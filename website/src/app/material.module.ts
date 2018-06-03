import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatToolbarModule,
    MatTableModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatToolbarModule,
    MatTableModule
  ],
})

export class MaterialModule { }
