import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import Game from 'src/app/models/Game';
import { MazeService } from 'src/app/services/maze.service';
import { GameOverDialogComponent } from 'src/app/dialogs/game-over/game-over.component';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.scss']
})
export class PlayAreaComponent implements OnInit {
  currentGame: Game;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private mazeService: MazeService,
    ) { }

  ngOnInit() {
    this.initGame();
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
    const moveResponse = await this.mazeService.makeMove(data, this.currentGame.id).toPromise();
    console.log(moveResponse);

    if (moveResponse.state === 'active') {
      const mazeState = await this.mazeService.getMazeState(this.currentGame.id).toPromise();
      this.currentGame.pony = mazeState.pony[0];
      this.currentGame.domokun = mazeState.domokun[0];
      if (moveResponse['state-result'] !== 'Move accepted') {
        this.toastr.info(moveResponse['state-result']);
      }
    } else {
      this.openEndGameDialog(moveResponse['state-result']);
    }
  }

  openEndGameDialog(message: string) {
    const dialogref = this.dialog.open(GameOverDialogComponent, {
      disableClose: true,
      panelClass: 'dialog_container',
      data: { message }
    });

    dialogref.afterClosed().subscribe((playAgain: boolean) => {
      if (playAgain) {
        this.initGame();
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  /**
   * Make request to create a new game and get the current state of the maze.
   */
  async initGame() {
    const newGameData = {
      'maze-width': 15,
      'maze-height': 15,
      'maze-player-name': 'Rarity',
      difficulty: 10
    };
    const { maze_id } = await this.mazeService.createMaze(newGameData).toPromise();

    const mazeState = await this.mazeService.getMazeState(maze_id).toPromise();

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

enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}
