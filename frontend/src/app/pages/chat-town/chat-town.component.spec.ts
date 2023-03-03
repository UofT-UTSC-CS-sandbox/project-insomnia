import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTownComponent } from './chat-town.component';

describe('ChatTownComponent', () => {
  let component: ChatTownComponent;
  let fixture: ComponentFixture<ChatTownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatTownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
