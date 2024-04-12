import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankdonationComponent } from './thankdonation.component';

describe('ThankdonationComponent', () => {
  let component: ThankdonationComponent;
  let fixture: ComponentFixture<ThankdonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThankdonationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThankdonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
