import { NgModule } from '@angular/core';
import { MatDialogModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    MatDialogModule, MatIconModule,
  ],
  exports: [
    MatDialogModule, MatIconModule,
  ],
  entryComponents: [],
})

export class MaterialModule {}
