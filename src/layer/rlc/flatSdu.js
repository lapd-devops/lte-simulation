import * as PIXI from 'pixi.js';
import {BG_DARK_2, FG_1} from 'Common/colors';
import Timer from "../timer";

const WIDTH = 124;
const HEIGHT = 20;

export default class FlatSDU extends PIXI.Graphics {
  constructor(width = WIDTH) {
    super();


    this.beginFill(BG_DARK_2);
    this.drawRect(0, 0, width, HEIGHT);
    this.endFill();

    this.caption = new PIXI.Text(
      'SDU',
      {
        fontSize: 8,
        fill: FG_1,
      }
    );
    this.caption.anchor.set(0.5, 0.5);
    this.caption.position.set(this.width / 2, this.height / 2);
    this.addChild(this.caption);
  }

  async startCounting() {
    this.timer = new Timer();
    this.timer.position.set(100, 10);
    this.addChild(this.timer);

    return this.timer.startCounting(10000);
  }
}

