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
  }

  private createApp() {
    this.app = new PIXI.Application({
      width: this.gameContainer.nativeElement.clientWidth,
      height: this.gameContainer.nativeElement.clientHeight,
      backgroundColor: 0x87ceeb,
    });
    this.gameContainer.nativeElement.appendChild(this.app.view);
  }

  private addAvatar() {
    const avatarTexture = PIXI.Texture.from('avatar.png');
    const avatarSprite = new PIXI.Sprite(avatarTexture);
    avatarSprite.anchor.set(0.5);
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
