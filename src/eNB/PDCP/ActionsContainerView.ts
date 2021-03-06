import * as PIXI from 'pixi.js';
import {BG_DARK_2, FG_1} from '../../Common/colors';

export default class ActionsContainerView extends PIXI.Container {
  sequenceAction: SequenceAction;
  compressAction: Action;
  encryptAction: Action;
  addHeaderAction: Action;

  constructor(resources: Partial<Record<string, PIXI.LoaderResource>>) {
    super();

    this.sequenceAction = new SequenceAction(resources);
    this.compressAction = new Action(resources, 'ROHC');
    this.compressAction.position.set(this.sequenceAction.width - 2, 0);
    this.encryptAction = new Action(resources, 'EPS');
    this.encryptAction.position.set(this.compressAction.width - 2 + this.compressAction.x, 0);
    this.addHeaderAction = new Action(resources, 'HEADER');
    this.addHeaderAction.position.set(this.encryptAction.x + this.encryptAction.width - 2, 0);

    this.addChild(
      this.sequenceAction,
      this.compressAction,
      this.encryptAction,
      this.addHeaderAction
    );
  }

}

class Action extends PIXI.Graphics {
  bullet: PIXI.Sprite;
  actionText: PIXI.Text;

  constructor(resources: Partial<Record<string, PIXI.LoaderResource>>, text: string) {
    super();

    this.actionText = new PIXI.Text(
      text,
      {
        fill: FG_1,
        fontSize: 20,
      }
    );
    this.actionText.anchor.set(0, 0.5);
    this.actionText.position.set(30, 20);

    this.lineStyle(2, BG_DARK_2);
    this.drawRect(0, 0, this.actionText.width + 40, 40);

    this.bullet = new PIXI.Sprite(resources.bullet.texture);
    this.bullet.anchor.set(0.5, 0.5);
    this.bullet.position.set(15, 20);

    this.addChild(this.bullet);
    this.addChild(this. actionText);
  }

  activate() {
    this.bullet.tint = PIXI.utils.rgb2hex([0.2, 0.2, 0.2]);
  }

  deactivate() {
    this.bullet.tint = PIXI.utils.rgb2hex([1.0, 1.0, 1.0]);
  }
}

class SequenceAction extends Action {
  constructor(resources: Partial<Record<string, PIXI.LoaderResource>>) {
    super(resources, '#0');
  }

  setSequenceNumber(sequenceNumber: number) {
    this.actionText.text = '#' + sequenceNumber;
  }
}
