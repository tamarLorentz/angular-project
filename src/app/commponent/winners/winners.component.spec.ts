import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnersComponent } from './winners.component';

describe('RaffleComponent', () => {
  let component: WinnersComponent;
  let fixture: ComponentFixture<WinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
