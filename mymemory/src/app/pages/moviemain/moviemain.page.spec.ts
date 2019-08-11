import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviemainPage } from './moviemain.page';

describe('MoviemainPage', () => {
  let component: MoviemainPage;
  let fixture: ComponentFixture<MoviemainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviemainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviemainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
