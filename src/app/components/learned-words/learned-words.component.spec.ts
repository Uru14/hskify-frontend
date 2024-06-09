import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnedWordsComponent } from './learned-words.component';

describe('LearnedWordsComponent', () => {
  let component: LearnedWordsComponent;
  let fixture: ComponentFixture<LearnedWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnedWordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnedWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
