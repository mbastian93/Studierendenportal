import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusScheduleComponent } from './bus-schedule.component';

describe('BusStopsComponent', () => {
  let component: BusScheduleComponent;
  let fixture: ComponentFixture<BusScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
