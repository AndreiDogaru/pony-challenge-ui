import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-game-over-dialog',
  templateUrl: 'game-over.component.html',
  styleUrls: ['game-over.component.scss']
})
export class GameOverDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GameOverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  close(playAgain: boolean = false) {
    this.dialogRef.close(playAgain);
  }
}
