import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankjoinusComponent } from './thankjoinus.component';

describe('ThankjoinusComponent', () => {
  let component: ThankjoinusComponent;
  let fixture: ComponentFixture<ThankjoinusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThankjoinusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThankjoinusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
