import { Sprite } from './sprite';

export class Player {
  x: number;
  y: number;
  direction: string = 'down';
  isSpriteLoaded: boolean = false;
  isPlayerMoving: boolean = false;

  private sprite: Sprite;
  private moveUpdate: { [key: string]: [number, number] } = {
    up: [0, -16],
    down: [0, 16],
    left: [-16, 0],
    right: [16, 0],
  };

  constructor(config: any) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.sprite = new Sprite({
      skin: config.skin,
      playerObject: this,
      container: config.container,
      direction: config.direction,
    });
  }

  get playerSprite() {
    return this.sprite.playerSprite;
  }

  refineState(state: any) {
    if (state.direction === undefined) {
      const xChange = state.x - this.x;
      const yChange = state.y - this.y;
      if (xChange > 0) {
        state.direction = 'right';
      } else if (xChange < 0) {
        state.direction = 'left';
      } else if (yChange > 0) {
        state.direction = 'down';
      } else if (yChange < 0) {
        state.direction = 'up';
      }
    } else {
      const [x, y] = this.moveUpdate[state.direction];
      state.x = this.x + x;
      state.y = this.y + y;
    }
  }

  update(state: any) {
    this.refineState(state);
    this.updatePosition(state);
    this.updateSprite(state);
  }

  private updatePosition(state: any) {
    if (this.isPlayerMoving && state.direction !== this.direction) return;
    this.x = state.x;
    this.y = state.y;
  }

  private updateSprite(state: any) {
    this.sprite.update(state);
  }

  playAnimation(direction: string) {
    this.sprite.playAnimation(direction);
  }

  remove() {
    this.sprite.removeFromStage();
  }
}
