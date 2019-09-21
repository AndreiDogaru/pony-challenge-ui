import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import Maze from '../models/Game';
import MazeData from '../models/MazeData';

@Injectable({
  providedIn: 'root'
})
export class MazeService {
  private baseHref = `${environment.apiUrl}/maze`;

  constructor(private http: HttpClient) { }

  /**
   * Make request to create a new maze game.
   * @typeparam MazeData `width: number`, `height: number`
   * @returns Object containing `maze_id`
   */
  createMaze(data: MazeData): Observable<any> {
    const url = `${this.baseHref}`;
    return this.http.post<any>(url, data);
  }

  /**
   * Make request to move the pony.
   * @param direction can be one of `east, west, north, south or stay`
   * @returns Object containing game status and a message
   */
  makeMove(data: { direction: string }, mazeId: string): Observable<any> {
    const url = `${this.baseHref}/${mazeId}`;
    return this.http.post<any>(url, data);
  }

  /**
   * Make request to get the current state of the maze.
   * @returns Object containing the positions of pony, domokun and end-point,
   *   as well as the maze's size and difficulty and all available walls.
   */
  getMazeState(mazeId: string): Observable<any> {
    const url = `${this.baseHref}/${mazeId}`;
    return this.http.get<any>(url);
  }
}
