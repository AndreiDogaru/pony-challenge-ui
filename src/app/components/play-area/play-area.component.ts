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
      size: { width: 15, height: 15 },
      data: [],
      pony: 0,
      domokun: 39,
      exit: 224,
    };
    const maze = this.initMaze(newGameData.size);
    newGameData.data = [...maze];
    this.currentGame = new Game(newGameData);
    console.log(this.currentGame)
  }

  initMaze(size: { width: number, height: number }) {
    const maze = [];
    for (let i = 0; i < size.width * size.height; i += 1) {
      maze.push({ walls: ['north', 'west'], isVisited: true });
    }

    const initialPosition = 0;
    maze[initialPosition].isVisited = true;
    return this.generatePath(maze, size.width, initialPosition, [initialPosition]);
  }

  generatePath(maze: any[], width: number, currentCell: number, stack: any[]) {
    // Possible directions from currentCell:
    // 1. North: currentCell - width, if currentCell >= width
    // 2. South: currentCell + width, if currentCell < maze.length - width
    // 3. West: currentCell - 1, if currentCell % width !== 0
    // 4. East: currentCell + 1, if (currentCell + 1) % width !== 0

    const hasUnvisitedCells = maze.find(item => item.isVisited);
    console.log(hasUnvisitedCells);
    if (!hasUnvisitedCells) { console.log('1'); return maze.map(cell => cell.walls); }
    console.log('2');

    // Gather all unvisited neighbours
    const neighbours = [];
    if (currentCell >= width && !maze[currentCell - width].isVisited) {
      // North neighbour
      neighbours.push(currentCell - width);
    }
    if (currentCell < maze.length - width && !maze[currentCell + width].isVisited) {
      // South neighbour
      neighbours.push(currentCell + width);
    }
    if (currentCell % width !== 0 && !maze[currentCell - 1].isVisited) {
      // West neighbour
      neighbours.push(currentCell - 1);
    }
    if ((currentCell + 1) % width !== 0 && !maze[currentCell + 1].isVisited) {
      // East neighbour
      neighbours.push(currentCell + 1);
    }

    // If there is no unvisited neighbour, then pop the last cell from the stack
    if (!neighbours) {
      stack = stack.splice(stack.length - 1, 1);
      currentCell = stack[stack.length - 1];
      return this.generatePath(maze, width, currentCell, stack);
    }

    // Choose a random neighbour
    const randomNeighbour = neighbours[Math.floor(Math.random() * neighbours.length)];

    // Mark the index as visited in the maze array
    maze[randomNeighbour].isVisited = true;

    // Remove wall between selected neighbour and currentCell from maze array
    switch (randomNeighbour) {
      case currentCell - width:
        // remove North wall from currentCell
        maze[currentCell].walls.splice(maze[currentCell].walls.indexOf('north'), 1);
        break;
      case currentCell + width:
        // remove North wall from cell situated below currentCell
        maze[currentCell + width].walls.splice(maze[currentCell + width].walls.indexOf('north'), 1);
        break;
      case currentCell - 1:
        // remove West wall from currentCell
        maze[currentCell].walls.splice(maze[currentCell].walls.indexOf('west'), 1);
        break;
      case currentCell + 1:
        // remove West wall from cell situated on the right side of currentCell
        maze[currentCell + 1].walls.splice(maze[currentCell + 1].walls.indexOf('west'), 1);
        break;
      default: break;

    }

    // Push neighbour to the stack
    stack.push(randomNeighbour);

    // Make neighbour currentCell
    currentCell = randomNeighbour;

    // Call this function again
    return this.generatePath(maze, width, currentCell, stack);
  }

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
