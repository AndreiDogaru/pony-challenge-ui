export default class MazeData {
  'maze-width': number;
  'maze-height': number;
  'maze-player-name': string;
  difficulty: number;

  constructor(data: MazeData) {
    Object.assign(this, data);
  }
}
