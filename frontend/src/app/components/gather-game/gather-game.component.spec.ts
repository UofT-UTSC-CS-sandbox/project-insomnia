import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatherGameComponent } from './gather-game.component';

describe('GatherGameComponent', () => {
  let component: GatherGameComponent;
  let fixture: ComponentFixture<GatherGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GatherGameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GatherGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
