import { Component, OnInit } from '@angular/core';

import Game from '../../models/Game';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.scss']
})
export class PlayAreaComponent implements OnInit {
  currentGame: Game;

  constructor() { }

  ngOnInit() {
    const newGameData = {
      size: { width: 15, height: 25 },
      data: [],
      pony: 6,
      domokun: 1,
      exit: 8,
    };
    for (let i = 0; i < newGameData.size.width * newGameData.size.height; i += 1) {
      const borders = [];
      if (i % 2 === 0) { borders.push('north'); }
      if (i % 5 === 0) { borders.push('west'); }
      newGameData.data.push(borders);
    }
    this.currentGame = new Game(newGameData);
    console.log(this.currentGame);
  }

  getBorder(position: string, item: string[], index: number): string {
    let hasBorder: boolean;
    switch (position) {
      case 'top':
        hasBorder = index < this.currentGame.size.width || item.indexOf('north') !== -1;
        break;
      case 'bottom':
        hasBorder = index >= this.currentGame.size.width * this.currentGame.size.height - this.currentGame.size.width;
        break;
      case 'left':
        hasBorder = index % this.currentGame.size.width === 0 || item.indexOf('west') !== -1;
        break;
      case 'right':
        hasBorder = (index + 1) % this.currentGame.size.width === 0;
        break;
      default:
        hasBorder = false;
    }
    return hasBorder ? '1px solid' : 'none';
  }
}
