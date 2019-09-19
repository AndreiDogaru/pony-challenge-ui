export default class Game {
  id?: string;
  pony: number;
  domokun: number;
  exit: number;
  size: { width: number, height: number; };
  data: string[][];

  constructor(data: Game) {
    Object.assign(this, data);
  }
}
