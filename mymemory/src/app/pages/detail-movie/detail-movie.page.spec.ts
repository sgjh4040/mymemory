import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMoviePage } from './detail-movie.page';

describe('DetailMoviePage', () => {
  let component: DetailMoviePage;
  let fixture: ComponentFixture<DetailMoviePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMoviePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
