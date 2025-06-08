import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDonorsComponent } from './manage-donors.component';

describe('ManageDonorsComponent', () => {
  let component: ManageDonorsComponent;
  let fixture: ComponentFixture<ManageDonorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDonorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDonorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
