import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MazeService } from 'src/app/services/maze.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  width: number;
  height: number;
  difficulty: number;

  constructor(
    private router: Router,
    private mazeService: MazeService,
    private storage: StorageService,
  ) { }

  ngOnInit() { }

  /**
   * Make request to create a new game.
   */
  async initGame() {
    const newGameData = {
      'maze-width': this.width,
      'maze-height': this.height,
      'maze-player-name': 'Rarity',
      difficulty: this.difficulty
    };
    const { maze_id } = await this.mazeService.createMaze(newGameData).toPromise();

    if (maze_id) {
      this.storage.mazeId = maze_id;
      this.router.navigate(['/play']);
    }
  }

  /**
   * Check if the action button is disabled or not.
   */
  isBtnDisabled(): boolean {
    return !this.width || !this.height;
  }
}
