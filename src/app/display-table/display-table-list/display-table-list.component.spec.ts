import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTableListComponent } from './display-table-list.component';

describe('DisplayTableListComponent', () => {
  let component: DisplayTableListComponent;
  let fixture: ComponentFixture<DisplayTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayTableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
