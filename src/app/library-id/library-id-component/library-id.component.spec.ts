import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryIdComponent } from './library-id.component';

describe('LibraryIdComponent', () => {
  let component: LibraryIdComponent;
  let fixture: ComponentFixture<LibraryIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
