export default class MazeData {
  width: number;
  height: number;

  constructor(data: MazeData) {
    Object.assign(this, data);
  }
}
