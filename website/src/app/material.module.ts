import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatToolbarModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatToolbarModule
  ],
})

export class MaterialModule { }
