import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import Game from 'src/app/models/Game';
import { MazeService } from 'src/app/services/maze.service';
import { StorageService } from 'src/app/services/storage.service';
import { GameOverDialogComponent } from 'src/app/dialogs/game-over/game-over.component';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.scss']
})
export class PlayAreaComponent implements OnInit {
  currentGame: Game;
  activeToastId: number;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private mazeService: MazeService,
    private storage: StorageService,
    ) { }

  ngOnInit() {
    this.getCurrentState();
  }

  // Listen for keyup events and make req to move the pony
  @HostListener('window:keyup', ['$event'])
  keyupEvent(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowUp': return this.movePony({ direction: 'north' });
      case 'ArrowDown': return this.movePony({ direction: 'south' });
      case 'ArrowLeft': return this.movePony({ direction: 'west' });
      case 'ArrowRight': return this.movePony({ direction: 'east' });
      default: break;
    }
  }

  /**
   * Make request to move the pony and check the result. If the game is won or over, open a dialog.
   */
  async movePony(data: { direction: string }) {
    // remove the toast message from screen before making the req
    if (this.activeToastId) {
      this.toastr.remove(this.activeToastId);
      this.activeToastId = null;
    }

    const moveResponse = await this.mazeService.makeMove(data, this.currentGame.id).toPromise();

    if (moveResponse.state === 'active') {
      // if the game is active, get new maze state and move pony and domokun accordingly
      const mazeState = await this.mazeService.getMazeState(this.currentGame.id).toPromise();
      this.currentGame.pony = mazeState.pony[0];
      this.currentGame.domokun = mazeState.domokun[0];

      if (moveResponse['state-result'] !== 'Move accepted') {
        // if the move was not accepted, show toast message
        const toast = this.toastr.info(moveResponse['state-result']);
        this.activeToastId = toast.toastId;
      }

    } else {
      // if game is not active anymore, open the EndGame dialog
      this.openEndGameDialog(moveResponse['state-result']);
    }
  }

  openEndGameDialog(message: string) {
    const dialogref = this.dialog.open(GameOverDialogComponent, {
      disableClose: true,
      panelClass: 'dialog_container',
      data: { message }
    });

    // after the dialog is closed, either restart the game or show the home page
    dialogref.afterClosed().subscribe((playAgain: boolean) => {
      if (playAgain) {
        this.restartGame();
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  /**
   * Make request to create new game with the same configuration.
   */
  async restartGame() {
    const newGameData = {
      'maze-width': this.currentGame.size.width,
      'maze-height': this.currentGame.size.height,
      'maze-player-name': 'Rarity',
      difficulty: 1
    };
    const { maze_id } = await this.mazeService.createMaze(newGameData).toPromise();
    this.storage.mazeId = maze_id;

    // show the current state of the newly created game
    this.getCurrentState();
  }

  /**
   * Make request to get the current state of the maze.
   */
  async getCurrentState() {
    // if there is not mazeId, return to home page
    if (!this.storage.mazeId) {
      return this.router.navigate(['/home']);
    }

    const mazeState = await this.mazeService.getMazeState(this.storage.mazeId).toPromise();

    // save the new game inside a variable
    this.currentGame = {
      id: mazeState.maze_id,
      pony: mazeState.pony[0],
      domokun: mazeState.domokun[0],
      exit: mazeState['end-point'][0],
      size: {
        width: mazeState.size[0],
        height: mazeState.size[1]
      },
      data: mazeState.data
    };
  }

  /**
   * Get the border of a cell from the maze ( currentGame.data array ).
   * @param position can be one of `north, south, west, east`
   * @param item represents one cell of the maze
   * @param index represents the index of that cell in the maze array
   */
  getBorder(position: string, item: string[], index: number): string {
    let hasBorder: boolean;
    switch (position) {
      case 'north':
        hasBorder = index < this.currentGame.size.width || item.indexOf('north') !== -1;
        break;
      case 'south':
        hasBorder = index >= this.currentGame.size.width * this.currentGame.size.height - this.currentGame.size.width;
        break;
      case 'west':
        hasBorder = index % this.currentGame.size.width === 0 || item.indexOf('west') !== -1;
        break;
      case 'east':
        hasBorder = (index + 1) % this.currentGame.size.width === 0;
        break;
      default:
        hasBorder = false;
    }
    return hasBorder ? '1px solid' : 'none';
  }
}
