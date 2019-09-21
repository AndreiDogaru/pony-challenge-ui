export default class Game {
  id: string;
  pony: number;
  domokun: number;
  exit: number;
  width: number;
  height: number;
  data: string[][];
  state: string;

  constructor(data: Game) {
    Object.assign(this, data);
  }
}
