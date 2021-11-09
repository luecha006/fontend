import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInformationListComponent } from './search-information-list.component';

describe('SearchInformationListComponent', () => {
  let component: SearchInformationListComponent;
  let fixture: ComponentFixture<SearchInformationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInformationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInformationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
