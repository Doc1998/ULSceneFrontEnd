import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumTileComponent } from './forum-tile.component';

describe('ForumTileComponent', () => {
  let component: ForumTileComponent;
  let fixture: ComponentFixture<ForumTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
