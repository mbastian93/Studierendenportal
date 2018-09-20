import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcPoolsComponent } from './pc-pools.component';

describe('PcPoolsComponent', () => {
  let component: PcPoolsComponent;
  let fixture: ComponentFixture<PcPoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcPoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcPoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
