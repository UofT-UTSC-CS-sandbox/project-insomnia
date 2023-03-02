import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-gather-game',
  templateUrl: './gather-game.component.html',
  styleUrls: ['./gather-game.component.scss'],
})
export class GatherGameComponent implements OnInit {
  @ViewChild('gameContainer', { static: true })
  gameContainer!: ElementRef<HTMLDivElement>;

  app!: PIXI.Application;

  constructor() {}

  ngOnInit() {
    this.createApp();
    this.addAvatar();
    this.addEventListeners();
  }

  private createApp() {
    const canvas = document.createElement('canvas');
    this.gameContainer.nativeElement.appendChild(canvas);

    this.app = new PIXI.Application({
      view: canvas,
      width: this.gameContainer.nativeElement.clientWidth,
      height: this.gameContainer.nativeElement.clientHeight,
      backgroundColor: 0x87ceeb,
    });
  }

  private addAvatar() {
    const avatarTexture = PIXI.Texture.from('../../assets/avatar.png');
    //make the image smaller
    avatarTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    const avatarSprite = new PIXI.Sprite(avatarTexture);
    avatarSprite.scale.set(0.1, 0.1);
    avatarSprite.position.set(
      this.app.screen.width / 2,
      this.app.screen.height / 2
    );
    this.app.stage.addChild(avatarSprite);
  }
  private addEventListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp') {
        this.moveAvatar('forward');
      } else if (event.key === 'ArrowDown') {
        this.moveAvatar('backward');
      } else if (event.key === 'ArrowLeft') {
        this.moveAvatar('left');
      } else if (event.key === 'ArrowRight') {
        this.moveAvatar('right');
      }
    });
  }

  private moveAvatar(direction: 'forward' | 'backward' | 'left' | 'right') {
    const speed = 10;
    const avatarSprite = this.app.stage.children[0] as PIXI.Sprite;
    if (direction === 'left') {
      avatarSprite.scale.x = -1 * Math.abs(avatarSprite.scale.x);
    }
    if (direction === 'right') {
      avatarSprite.scale.x = Math.abs(avatarSprite.scale.x);
    }
    switch (direction) {
      case 'forward':
        avatarSprite.y -= speed;
        break;
      case 'backward':
        avatarSprite.y += speed;
        break;
      case 'left':
        avatarSprite.x -= speed;
        break;
      case 'right':
        avatarSprite.x += speed;
        break;
    }
  }
}
